@echo off
chcp 65001 >nul 2>&1
title Playwright Auto Framework - Test Runner
color 0A

:MENU
cls
echo ╔══════════════════════════════════════════════════════════════╗
echo ║           PLAYWRIGHT AUTO FRAMEWORK - TEST RUNNER           ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║                                                              ║
echo ║   [1]  Chay tat ca tests (All projects)                     ║
echo ║   [2]  Chay UI tests - Chromium                             ║
echo ║   [3]  Chay UI tests - Tat ca browsers                     ║
echo ║   [4]  Chay API tests                                      ║
echo ║   [5]  Chay UI tests - Mobile                               ║
echo ║   [6]  Chay tests co mo browser (Headed)                   ║
echo ║   [7]  Chay tests Debug mode                                ║
echo ║                                                              ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║   [8]  Xem HTML Report                                     ║
echo ║   [9]  Tao va xem Allure Report                            ║
echo ║                                                              ║
echo ╠══════════════════════════════════════════════════════════════╣
echo ║   [10] Chon environment (dev/staging/prod)                  ║
echo ║   [11] Cai dat Playwright browsers                         ║
echo ║   [12] Kiem tra TypeScript (Lint)                           ║
echo ║   [13] Xem danh sach tests                                 ║
echo ║                                                              ║
echo ║   [0]  Thoat                                                ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

set /p choice="  Nhap lua chon cua ban: "

if "%choice%"=="1" goto RUN_ALL
if "%choice%"=="2" goto RUN_UI_CHROMIUM
if "%choice%"=="3" goto RUN_UI_ALL
if "%choice%"=="4" goto RUN_API
if "%choice%"=="5" goto RUN_MOBILE
if "%choice%"=="6" goto RUN_HEADED
if "%choice%"=="7" goto RUN_DEBUG
if "%choice%"=="8" goto REPORT_HTML
if "%choice%"=="9" goto REPORT_ALLURE
if "%choice%"=="10" goto SET_ENV
if "%choice%"=="11" goto INSTALL_BROWSERS
if "%choice%"=="12" goto LINT
if "%choice%"=="13" goto LIST_TESTS
if "%choice%"=="0" goto EXIT

echo.
echo  [!] Lua chon khong hop le. Vui long thu lai.
timeout /t 2 >nul
goto MENU

:RUN_ALL
cls
echo ========================================
echo   Dang chay TAT CA tests...
echo ========================================
echo.
call npx playwright test
goto DONE

:RUN_UI_CHROMIUM
cls
echo ========================================
echo   Dang chay UI tests - Chromium...
echo ========================================
echo.
call npx playwright test --project=chromium
goto DONE

:RUN_UI_ALL
cls
echo ========================================
echo   Dang chay UI tests - All browsers...
echo ========================================
echo.
call npx playwright test --project=chromium --project=firefox --project=webkit
goto DONE

:RUN_API
cls
echo ========================================
echo   Dang chay API tests...
echo ========================================
echo.
call npx playwright test --project=api
goto DONE

:RUN_MOBILE
cls
echo ========================================
echo   Dang chay Mobile tests...
echo ========================================
echo.
call npx playwright test --project=mobile-chrome --project=mobile-safari
goto DONE

:RUN_HEADED
cls
echo ========================================
echo   Dang chay tests (Headed mode)...
echo ========================================
echo.
call npx playwright test --headed --project=chromium
goto DONE

:RUN_DEBUG
cls
echo ========================================
echo   Dang chay tests (Debug mode)...
echo ========================================
echo.
call npx playwright test --debug --project=chromium
goto DONE

:REPORT_HTML
cls
echo ========================================
echo   Dang mo HTML Report...
echo ========================================
echo.
call npx playwright show-report
goto DONE

:REPORT_ALLURE
cls
echo ========================================
echo   Dang tao Allure Report...
echo ========================================
echo.
call npx allure generate allure-results -o allure-report --clean
call npx allure open allure-report
goto DONE

:SET_ENV
cls
echo ╔════════════════════════════════════════╗
echo ║        CHON ENVIRONMENT                ║
echo ╠════════════════════════════════════════╣
echo ║   [1]  dev      (Mac dinh)            ║
echo ║   [2]  staging                         ║
echo ║   [3]  prod                            ║
echo ╚════════════════════════════════════════╝
echo.
set /p env_choice="  Nhap lua chon: "

if "%env_choice%"=="1" set TEST_ENV=dev
if "%env_choice%"=="2" set TEST_ENV=staging
if "%env_choice%"=="3" set TEST_ENV=prod

echo.
echo  [OK] Da chuyen sang environment: %TEST_ENV%
echo.
timeout /t 2 >nul
goto MENU

:INSTALL_BROWSERS
cls
echo ========================================
echo   Dang cai dat Playwright browsers...
echo ========================================
echo.
call npx playwright install --with-deps
goto DONE

:LINT
cls
echo ========================================
echo   Dang kiem tra TypeScript...
echo ========================================
echo.
call npx tsc --noEmit
if %ERRORLEVEL%==0 (
    echo.
    echo  [OK] Khong co loi TypeScript!
)
goto DONE

:LIST_TESTS
cls
echo ========================================
echo   Danh sach tat ca tests:
echo ========================================
echo.
call npx playwright test --list
goto DONE

:DONE
echo.
echo ========================================
echo   Hoan thanh!
echo ========================================
echo.
pause
goto MENU

:EXIT
cls
echo.
echo   Tam biet! ^_^
echo.
timeout /t 1 >nul
exit /b 0
