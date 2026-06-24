# Manual Test Cases - RISE CRM

## Table of Contents

- [1. Dashboard](#1-dashboard)
- [2. Clients](#2-clients)
- [3. Leads](#3-leads)
- [4. Projects](#4-projects)
- [5. Tasks](#5-tasks)

---

## 1. Dashboard

### 1.1 Page Display

#### TC-DASH-001: Verify Dashboard page loads

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Navigate to `/dashboard` | Page loads without error, HTTP status 200 | High | User is logged in as Admin |
| 2 | Observe URL | URL contains `/dashboard` | | |
| 3 | Observe page title | Browser title is "Dashboard \| RISE - Ultimate Project Manager and CRM" | | |
| 4 | Observe page heading | Heading "Dashboard" is visible | | |

### 1.2 Summary Statistics Widgets

#### TC-DASH-002: Verify "My open tasks" widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "My open tasks" widget | Widget is visible | High | User is logged in as Admin, on `/dashboard` |
| 2 | Observe count value | A numeric count is displayed (e.g. "50") | | |
| 3 | Click the widget | Navigates to `/tasks/all_tasks#my_open_tasks` | | |

#### TC-DASH-003: Verify "Events today" widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Events today" widget | Widget is visible | High | User is logged in as Admin, on `/dashboard` |
| 2 | Observe count value | A numeric count is displayed (e.g. "1") | | |
| 3 | Click the widget | Navigates to `/events` | | |

#### TC-DASH-004: Verify "Due" amount widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Due" widget | Widget is visible | High | User is logged in as Admin, on `/dashboard` |
| 2 | Observe value | A currency amount is displayed in format "$X,XXX.XX" (e.g. "$8,616.00") | | |
| 3 | Click the widget | Navigates to `/invoices/index` | | |

### 1.3 Projects Overview Widget

#### TC-DASH-005: Verify Projects Overview widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Projects Overview" section | Widget is visible | High | User is logged in as Admin, on `/dashboard`, at least 1 project exists |
| 2 | Observe Open count | Numeric count displayed with clickable link | | |
| 3 | Observe Completed count | Numeric count displayed with clickable link | | |
| 4 | Observe Hold count | Numeric count displayed with clickable link | | |
| 5 | Observe Progression | Percentage value displayed (e.g. "31%") | | |

#### TC-DASH-006: Verify Projects Overview links navigate correctly

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Open" count link | Navigates to `/projects/all_projects/1` (filtered by Open) | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Go back to dashboard | Dashboard reloads | | |
| 3 | Click "Completed" count link | Navigates to `/projects/all_projects/2` (filtered by Completed) | | |
| 4 | Go back to dashboard | Dashboard reloads | | |
| 5 | Click "Hold" count link | Navigates to `/projects/all_projects/3` (filtered by Hold) | | |

### 1.4 Invoice Overview Widget

#### TC-DASH-007: Verify Invoice Overview widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Invoice Overview" section | Widget is visible | High | User is logged in as Admin, on `/dashboard` |
| 2 | Observe statuses | Overdue: count + amount displayed (e.g. "3 - $1,200.00") | | |
| 3 | | Not paid: count + amount displayed | | |
| 4 | | Partially paid: count + amount displayed | | |
| 5 | | Fully paid: count + amount displayed | | |
| 6 | | Draft: count + amount displayed | | |
| 7 | Observe chart | Invoice overview line chart (`#invoice-overview-chart`) is rendered with non-zero dimensions | | |

#### TC-DASH-008: Verify Invoice Overview links navigate correctly

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Overdue" link | Navigates to `/invoices/index/custom/overdue/USD` | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Go back to dashboard | Dashboard reloads | | |
| 3 | Click "Not paid" link | Navigates to `/invoices/index/custom/not_paid/USD` | | |

### 1.5 Income vs Expenses Widget

#### TC-DASH-009: Verify Income vs Expenses widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Income vs Expenses" section | Widget is visible | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Observe income amount | Currency value displayed in format "$XX,XXX.XX" (e.g. "$17,830.00") | | |
| 3 | Observe expense amount | Currency value displayed in format "$XX,XXX.XX" (e.g. "$9,120.00") | | |
| 4 | Observe period | "This Year" label is shown | | |
| 5 | Observe charts | Income-expense chart (`#income-expense-chart`) is rendered | | |
| 6 | | Dashboard income-vs-expenses chart (`#dashboard-income-vs-expenses-chart`) is rendered | | |

### 1.6 All Tasks Overview Widget

#### TC-DASH-010: Verify All Tasks Overview widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "All Tasks Overview" section | Widget is visible | High | User is logged in as Admin, on `/dashboard`, at least 1 task exists |
| 2 | Observe task status counts | "To do" count displayed as numeric value (e.g. 82) | | |
| 3 | | "In progress" count displayed (e.g. 61) | | |
| 4 | | "Review" count displayed (e.g. 68) | | |
| 5 | | "Done" count displayed (e.g. 169) | | |
| 6 | | "Expired" count displayed (e.g. 134) | | |
| 7 | Observe chart | Tasks overview doughnut chart (`#all-tasks-overview-chart-all_tasks_overview`) is rendered | | |

### 1.7 Team Members Overview Widget

#### TC-DASH-011: Verify Team Members Overview widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Team Members" section | Widget is visible | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Observe Team members count | Numeric count displayed with clickable link | | |
| 3 | Observe "On leave today" count | Numeric count displayed | | |
| 4 | Observe "Members Clocked In" count | Numeric count displayed | | |
| 5 | Observe "Members Clocked Out" count | Numeric count displayed | | |
| 6 | Observe "Last announcement" | Announcement text and clickable link visible | | |

#### TC-DASH-012: Verify Team Members links navigate correctly

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Team members" link | Navigates to `/team_members/index` | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Go back to dashboard | Dashboard reloads | | |
| 3 | Click "Members Clocked In" link | Navigates to `/attendance/index/members_clocked_in` | | |

### 1.8 Ticket Status Widget

#### TC-DASH-013: Verify Ticket Status widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Ticket Status" section | Widget is visible | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Observe status counts | "New" count displayed as numeric value (e.g. 21) | | |
| 3 | | "Open" count displayed (e.g. 39) | | |
| 4 | | "Closed" count displayed (e.g. 69) | | |
| 5 | Observe ticket types | "General Support" count displayed | | |
| 6 | | "Bug Reports" count displayed | | |
| 7 | | "Sales Inquiry" count displayed | | |
| 8 | Observe chart | Ticket status chart (`#ticket-status-chart`) is rendered | | |

#### TC-DASH-014: Verify Ticket Status links navigate correctly

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "New" ticket link | Navigates to `/tickets/index/new` | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Go back to dashboard | Dashboard reloads | | |
| 3 | Click "Open" ticket link | Navigates to `/tickets/index/open` | | |

### 1.9 Charts

#### TC-DASH-015: Verify all dashboard charts are rendered

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe invoice chart | Canvas `#invoice-overview-chart` is visible with width > 0 and height > 0 | High | User is logged in as Admin, on `/dashboard` |
| 2 | Observe income-expense chart | Canvas `#income-expense-chart` is visible with non-zero dimensions | | |
| 3 | Observe income vs expenses bar chart | Canvas `#dashboard-income-vs-expenses-chart` is visible | | |
| 4 | Observe tasks chart | Canvas `#all-tasks-overview-chart-all_tasks_overview` is visible | | |
| 5 | Observe ticket chart | Canvas `#ticket-status-chart` is visible | | |

### 1.10 Clock In/Out Widget

#### TC-DASH-016: Verify Clock In/Out widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate Clock widget | Clock In or Clock Out button is visible | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Observe clock status | If clocked in: shows "Clock started at : [HH:MM AM/PM]" and "Clock Out" button | | |
| 3 | | If clocked out: shows "Clock In" button | | |

#### TC-DASH-017: Verify Clock Out action

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Clock Out" button | Clock stops, success notification displayed | Medium | User is logged in as Admin, on `/dashboard`, clock is currently running |
| 2 | Observe widget | Button changes from "Clock Out" to "Clock In" | | |

### 1.11 Project Timeline Widget

#### TC-DASH-018: Verify Project Timeline widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Project Timeline" section | Activity feed widget is visible | Medium | User is logged in as Admin, on `/dashboard`, at least 1 project activity exists |
| 2 | Observe feed entries | At least 1 activity entry displayed | | |
| 3 | Observe entry content | Each entry shows: team member name, action description, timestamp | | |
| 4 | Click "Load more" button | Additional activity entries are loaded and appended to list | | |

### 1.12 Events Widget

#### TC-DASH-019: Verify Events widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate Events section | Events list is visible | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Observe event items | At least 1 event displayed with title and date | | |
| 3 | Click "View on calendar" link | Navigates to `/events` calendar page | | |

### 1.13 My Tasks Table Widget

#### TC-DASH-020: Verify My Tasks table widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "My Tasks" table | Task table (`#task-table`) is visible | High | User is logged in as Admin, on `/dashboard`, at least 1 task assigned to user |
| 2 | Observe table headers | Columns displayed: ID, Title, Start date, Deadline, Status | | |
| 3 | Observe data rows | At least 1 task row is displayed | | |
| 4 | Observe task labels | Task labels (Design, Bug, Enhancement, etc.) are visible where applicable | | |

#### TC-DASH-021: Verify My Tasks table shows task status

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe task status column | Each task row shows a status badge with text: "To do", "In progress", "Review", or "Done" | Medium | User is logged in as Admin, on `/dashboard`, tasks exist with various statuses |

### 1.14 To Do (Private) Widget

#### TC-DASH-022: Verify To do widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "To do" section | To do widget is visible | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Observe to-do items | To-do items are listed (e.g. "Set roles and permissions for team members") | | |
| 3 | Observe actions | Each item has Edit (pencil icon) and Delete (trash icon) action buttons | | |

#### TC-DASH-023: Verify adding a new to-do item

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Add to do" in quick actions | Add to do modal/form opens | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Enter to-do title: "Test to do [timestamp]" | Value entered | | |
| 3 | Save the to-do | To-do item "Test to do [timestamp]" appears in the list | | |

### 1.15 Sticky Note Widget

#### TC-DASH-024: Verify Sticky Note widget

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Sticky Note" section | Sticky note widget is visible | Low | User is logged in as Admin, on `/dashboard` |
| 2 | Observe content | Default text "My quick notes here..." or previously saved notes displayed | | |
| 3 | Click on sticky note | Note becomes editable (cursor appears) | | |
| 4 | Type new text: "Updated note [timestamp]" | Text entered in note | | |
| 5 | Click outside the note area | Note is saved (no error) | | |
| 6 | Refresh page (F5) | Note retains the updated text "Updated note [timestamp]" | | |

### 1.16 Quick Actions

#### TC-DASH-025: Verify Quick action dropdown items

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Open quick actions dropdown | Dropdown menu opens | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Observe items | Following actions visible: Add task, Add multiple tasks, Add project time, Add event, Add note, Add to do, Add ticket | | |

#### TC-DASH-026: Verify "Add task" quick action opens modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Open quick actions dropdown | Menu opens | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Click "Add task" | Add task modal opens with overlay | | |
| 3 | Observe modal title | Title text is "Add task" | | |
| 4 | Observe modal content | Task form fields (Title, Description, Status, etc.) are displayed | | |

#### TC-DASH-027: Verify "Add event" quick action opens modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Open quick actions dropdown | Menu opens | Medium | User is logged in as Admin, on `/dashboard` |
| 2 | Click "Add event" | Add event modal opens with overlay | | |
| 3 | Observe modal title | Title text is "Add event" | | |

### 1.17 Open Projects List

#### TC-DASH-028: Verify Open Projects list

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Locate "Open Projects" section | Open projects list is visible | Medium | User is logged in as Admin, on `/dashboard`, at least 1 open project exists |
| 2 | Observe project items | At least 1 project link displayed with project name | | |
| 3 | Click a project link | Navigates to the project detail page (URL contains `/projects/view/`) | | |

### 1.18 Dashboard Management

#### TC-DASH-029: Verify "Add new dashboard" option

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Open dashboard options dropdown | Menu opens | Low | User is logged in as Admin, on `/dashboard` |
| 2 | Click "Add new dashboard" | Modal/form opens with dashboard name input field | | |
| 3 | Observe form | Dashboard name text input is visible and focusable | | |

---

## 2. Clients

### 2.1 Page Display

#### TC-CLI-001: Verify Clients page loads with Overview tab

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Navigate to `/clients` | Page loads without error, HTTP status 200 | High | User is logged in as Admin |
| 2 | Observe URL | URL contains `/clients` | | |
| 3 | Observe default tab | "Overview" tab is active by default (highlighted/selected state) | | |
| 4 | Observe tabs | 3 tabs visible: Overview, Clients, Contacts | | |

#### TC-CLI-002: Verify action buttons display

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe header buttons | "Add client" button is visible and clickable | High | User is logged in as Admin, on `/clients` |
| 2 | | "Manage labels" button is visible and clickable | | |
| 3 | | "Import clients" button is visible and clickable | | |

#### TC-CLI-003: Verify Overview cards display

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe overview section | Summary cards visible with labels: "Total clients", "Total contacts" | Medium | User is logged in as Admin, on `/clients` Overview tab |
| 2 | Verify card values | Each card displays a numeric value >= 0 | | |
| 3 | Verify card count | At least 1 overview card is displayed | | |

### 2.2 Tab Navigation

#### TC-CLI-004: Switch to Clients list tab

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Clients" tab | Clients tab becomes active (highlighted) | High | User is logged in as Admin, on `/clients` Overview tab |
| 2 | Observe content | Client data table is displayed | | |
| 3 | Verify table columns | Table has columns: ID, Name, Primary contact, Phone, Client groups, Labels, Projects, Total invoiced, Payment Received, Due | | |

#### TC-CLI-005: Switch to Contacts tab

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Contacts" tab | Contacts tab becomes active (highlighted) | High | User is logged in as Admin, on `/clients` Overview tab |
| 2 | Observe content | Contacts data table is displayed | | |
| 3 | Verify table columns | Table has columns: Name, Client name, Job Title, Email, Phone | | |

#### TC-CLI-006: Switch between all tabs

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Clients" tab | Clients tab becomes active, client table visible | Medium | User is logged in as Admin, on `/clients` Overview tab |
| 2 | Click "Contacts" tab | Contacts tab becomes active, contacts table visible | | |
| 3 | Click "Overview" tab | Overview tab becomes active, overview cards visible | | |

### 2.3 Export

#### TC-CLI-007: Verify export buttons display

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe export area | "Excel" button is visible and clickable | Medium | User is logged in as Admin, on `/clients` Clients tab |
| 2 | | "Print" button is visible and clickable | | |

### 2.4 Add Client Modal

#### TC-CLI-008: Open Add client modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Add client" button | Modal dialog opens with overlay | High | User is logged in as Admin, on `/clients` |
| 2 | Observe modal title | Title text is "Add client" | | |
| 3 | Observe modal | Modal is visible with form fields and action buttons | | |

#### TC-CLI-009: Verify all form fields in Add client modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe Type field | 2 radio buttons: "Organization" (default checked) and "Person" | High | User is logged in as Admin, Add client modal is open |
| 2 | Observe Company name | Text input, placeholder "Company name" | | |
| 3 | Observe Owner | Select2 dropdown for owner selection | | |
| 4 | Observe Address | Textarea for address | | |
| 5 | Observe City | Text input, placeholder "City" | | |
| 6 | Observe State | Text input, placeholder "State" | | |
| 7 | Observe Zip | Text input, placeholder "Zip" | | |
| 8 | Observe Country | Text input, placeholder "Country" | | |
| 9 | Observe Phone | Text input with international country code selector | | |
| 10 | Observe Website | Text input, placeholder "Website" | | |
| 11 | Observe VAT Number | Text input, placeholder "VAT Number" | | |
| 12 | Observe GST Number | Text input, placeholder "GST Number" | | |
| 13 | Observe Client groups | Select2 multi-select | | |
| 14 | Observe Currency | Select2 dropdown, placeholder "Keep it blank to use the default (USD)" | | |
| 15 | Observe Currency Symbol | Text input, placeholder "Keep it blank to use the default ($)" | | |
| 16 | Observe Labels | Select2 multi-select | | |
| 17 | Observe Disable online payment | Checkbox, unchecked by default | | |
| 18 | Observe buttons | "Save", "Save & continue", "Close" buttons visible | | |

#### TC-CLI-010: Close Add client modal via X button

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click X (close) button on modal header | Modal closes with animation | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Observe page | Modal is hidden, overlay removed, page returns to normal state | | |

#### TC-CLI-011: Close modal via Close button

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Close" button at modal footer | Modal closes with animation | Low | User is logged in as Admin, Add client modal is open |
| 2 | Observe page | Modal is hidden, overlay removed | | |

#### TC-CLI-012: Default type is Organization

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe Type radio buttons | "Organization" radio is checked by default | Medium | User is logged in as Admin, Add client modal is open |
| 2 | | "Person" radio is NOT checked | | |

#### TC-CLI-013: Switch type to Person

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Person" radio | "Person" radio becomes checked, "Organization" unchecked | Medium | User is logged in as Admin, Add client modal is open, Organization selected |
| 2 | Observe Company name label | Label changes from "Company name" to "Name" | | |
| 3 | Observe other fields | All other fields remain unchanged | | |

### 2.5 Validation

#### TC-CLI-014: Validate required fields - empty form

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Leave all fields empty | All fields are blank | High | User is logged in as Admin, Add client modal is open |
| 2 | Click "Save" | Modal stays open, form is NOT submitted | | |
| 3 | Observe Company name field | Red error message displayed: "This field is required." | | |

#### TC-CLI-014a: Validate Company name with only whitespace

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "   " (spaces only) | Whitespace entered | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Click "Save" | Form should NOT submit successfully, or trims whitespace and shows required error | | |

#### TC-CLI-014b: Validate Website field with invalid URL format

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "Test Client URL" | Value entered | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Enter Website: "not-a-url" | Invalid URL entered | | |
| 3 | Click "Save" | Error message for Website field indicating invalid URL format, OR client created with literal text | | |

#### TC-CLI-014c: Validate Phone field with letters

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "Test Client Phone" | Value entered | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Enter Phone: "abcdefgh" (letters only) | Invalid phone entered | | |
| 3 | Click "Save" | Error message for Phone field, OR system sanitizes/rejects non-numeric input | | |

### 2.6 Create Client - Organization

#### TC-CLI-015: Create Organization client with mandatory fields only

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Verify "Organization" radio is selected | Radio button is checked | High | User is logged in as Admin, Add client modal is open |
| 2 | Enter Company name: "Test Org Mandatory [timestamp]" | Value entered in input field | | |
| 3 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 4 | Observe Clients tab table | New client "Test Org Mandatory [timestamp]" appears in the table | | |

#### TC-CLI-016: Create Organization client with all fields

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Select "Organization" type | Organization radio checked | High | User is logged in as Admin, Add client modal is open |
| 2 | Enter Company name: "Test Org Full [timestamp]" | Value entered | | |
| 3 | Enter Address: "123 Le Loi Street" | Value entered | | |
| 4 | Enter City: "Ho Chi Minh" | Value entered | | |
| 5 | Enter State: "HCM" | Value entered | | |
| 6 | Enter Zip: "700000" | Value entered | | |
| 7 | Enter Country: "Vietnam" | Value entered | | |
| 8 | Enter Phone: "0901234567" | Value entered | | |
| 9 | Enter Website: "https://org-full.com" | Value entered | | |
| 10 | Enter VAT Number: "VAT123456" | Value entered | | |
| 11 | Enter GST Number: "GST789012" | Value entered | | |
| 12 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 13 | Observe Clients tab table | New client "Test Org Full [timestamp]" appears in table | | |

### 2.7 Create Client - Person

#### TC-CLI-017: Create Person client with mandatory fields only

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Person" radio | Person selected, label changes to "Name" | High | User is logged in as Admin, Add client modal is open |
| 2 | Enter Name: "Test Person Mandatory [timestamp]" | Value entered | | |
| 3 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 4 | Observe Clients tab table | New client "Test Person Mandatory [timestamp]" appears in table | | |

#### TC-CLI-018: Create Person client with all fields

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Person" radio | Person selected | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Enter Name: "Test Person Full [timestamp]" | Value entered | | |
| 3 | Enter Address: "456 Nguyen Hue Boulevard" | Value entered | | |
| 4 | Enter City: "Ha Noi" | Value entered | | |
| 5 | Enter State: "HN" | Value entered | | |
| 6 | Enter Zip: "100000" | Value entered | | |
| 7 | Enter Country: "Vietnam" | Value entered | | |
| 8 | Enter Phone: "0912345678" | Value entered | | |
| 9 | Enter Website: "https://person-full.com" | Value entered | | |
| 10 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 11 | Observe Clients tab table | New client "Test Person Full [timestamp]" appears with correct data | | |

### 2.8 Search

#### TC-CLI-019: Search clients by keyword

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Note initial row count (e.g., N rows) | Row count recorded | High | User is logged in as Admin, on `/clients` Clients tab, at least 1 client with "test" in name |
| 2 | Enter "test" in search input | Table filters in real-time | | |
| 3 | Observe results | Only rows containing "test" in any visible column are shown | | |
| 4 | Verify filtered count | Filtered count <= initial count N | | |
| 5 | Clear search input | Table returns to showing all rows (N rows) | | |

### 2.9 Boundary Value Analysis

#### TC-CLI-020: Validate Company name - minimum length (1 character)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "A" (1 character) | Value entered | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Click "Save" | Client created successfully, modal closes | | |

#### TC-CLI-021: Validate Company name - very long input (255+ characters)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: 256 character string "AAAA...A" | Value entered or truncated at max limit | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Click "Save" | Either: (a) Client created with truncated name, or (b) Error message about max length | | |

### 2.10 Special Test Data

#### TC-CLI-022: Create client with Vietnamese characters (diacritical marks)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "Cong ty TNHH Phat Trien Phan Mem Da Nang" | Vietnamese characters accepted | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Click "Save" | Modal closes, client created successfully | | |
| 3 | Observe table | Client name displays correctly with Vietnamese diacritical marks (no garbled characters) | | |

#### TC-CLI-023: Create client with special characters

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "O'Brien & Partners (Ltd.)" | Special characters entered | Medium | User is logged in as Admin, Add client modal is open |
| 2 | Click "Save" | Modal closes, client created successfully | | |
| 3 | Observe table | Client name displays correctly: "O'Brien & Partners (Ltd.)" | | |

### 2.11 Security

#### TC-CLI-024: XSS prevention in Company name field

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: `<script>alert('XSS')</script>` | Value entered as text | High | User is logged in as Admin, Add client modal is open |
| 2 | Click "Save" | Client created or input rejected | | |
| 3 | Observe table | Script is NOT executed, no alert popup. Name displays as escaped/sanitized text | | |

#### TC-CLI-025: SQL Injection prevention in Company name field

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: `' OR 1=1; DROP TABLE clients; --` | Value entered as text | High | User is logged in as Admin, Add client modal is open |
| 2 | Click "Save" | No server error (no HTTP 500). Client created with literal text or input rejected | | |
| 3 | Observe system | Application continues to function normally, all data intact | | |

### 2.12 Data Validation

#### TC-CLI-026: Verify created client data displays correctly in detail

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Navigate to Clients tab | Client table visible | High | Client "Test Org Full [timestamp]" created via TC-CLI-016 |
| 2 | Search for "Test Org Full [timestamp]" | Client row found | | |
| 3 | Verify Name column | Displays "Test Org Full [timestamp]" | | |
| 4 | Click on client row to open detail | Client detail page opens | | |
| 5 | Verify Address | Displays "123 Le Loi Street" | | |
| 6 | Verify City | Displays "Ho Chi Minh" | | |
| 7 | Verify Phone | Displays "0901234567" | | |
| 8 | Verify Website | Displays "https://org-full.com" | | |

---

## 3. Leads

### 3.1 Page Display

#### TC-LEAD-001: Verify Leads page loads

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Navigate to `/leads` | Page loads without error, HTTP status 200 | High | User is logged in as Admin |
| 2 | Observe URL | URL contains `/leads` | | |
| 3 | Observe content | Lead data table is visible with rows | | |

#### TC-LEAD-002: Verify action buttons display

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe header buttons | "Add lead" button is visible and clickable | High | User is logged in as Admin, on `/leads` |
| 2 | | "Manage labels" button is visible and clickable | | |
| 3 | | "Import leads" button is visible and clickable | | |

#### TC-LEAD-003: Verify view tabs display

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe tabs | "Leads" tab is visible and active (highlighted) | Medium | User is logged in as Admin, on `/leads` |
| 2 | | "Kanban" tab is visible | | |

#### TC-LEAD-004: Verify lead table headers

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe table headers | Headers displayed: Name, Primary contact, Phone, Owner, Labels, Created at, Status | Medium | User is logged in as Admin, on `/leads` list view |

#### TC-LEAD-005: Verify lead data rows exist

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe table body | At least 1 data row is displayed (not empty state) | Medium | User is logged in as Admin, on `/leads`, at least 1 lead exists |

### 3.2 View Switching

#### TC-LEAD-006: Switch to Kanban view

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Kanban" tab | Kanban board loads successfully | High | User is logged in as Admin, on `/leads` list view |
| 2 | Observe URL | URL contains `/kanban` | | |
| 3 | Observe columns | Kanban columns displayed: New, Qualified, Discussion, Negotiation, Won, Lost | | |

#### TC-LEAD-007: Switch back to Leads list view

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Leads" tab | List view loads | Medium | User is logged in as Admin, on `/leads` Kanban view |
| 2 | Observe URL | URL ends with `/leads` | | |
| 3 | Observe content | Lead data table is visible again with rows | | |

### 3.3 Search & Export

#### TC-LEAD-008: Search leads by keyword

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Note initial row count (e.g., N rows) | Count recorded | High | User is logged in as Admin, on `/leads` list view, at least 1 lead exists |
| 2 | Enter "tech" in search input | Table filters in real-time | | |
| 3 | Observe results | Only rows containing "tech" in visible columns are shown, filtered count <= N | | |
| 4 | Clear search input | Table returns to N rows | | |

#### TC-LEAD-009: Verify export buttons

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe export area | "Excel" button is visible and clickable | Medium | User is logged in as Admin, on `/leads` |
| 2 | | "Print" button is visible and clickable | | |

### 3.4 Add Lead Modal

#### TC-LEAD-010: Open Add lead modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Add lead" button | Modal dialog opens with overlay | High | User is logged in as Admin, on `/leads` |
| 2 | Observe modal title | Title text is "Add lead" | | |

#### TC-LEAD-011: Verify all form fields in Add lead modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe Type field | 2 radio buttons: "Organization" (default checked), "Person" | High | User is logged in as Admin, Add lead modal is open |
| 2 | Observe Company name | Text input, placeholder "Company name", required | | |
| 3 | Observe Status | Select2 dropdown with options: New, Qualified, Discussion, Negotiation, Won, Lost | | |
| 4 | Observe Owner | Select2 autocomplete | | |
| 5 | Observe Source | Select2 dropdown with options: Google, Facebook, Twitter, Youtube, Elsewhere, Site, Google ads | | |
| 6 | Observe Address | Textarea | | |
| 7 | Observe City | Text input | | |
| 8 | Observe State | Text input | | |
| 9 | Observe Zip | Text input | | |
| 10 | Observe Country | Text input | | |
| 11 | Observe Phone | Text input with country code selector | | |
| 12 | Observe Website | Text input | | |
| 13 | Observe VAT Number | Text input | | |
| 14 | Observe GST Number | Text input | | |
| 15 | Observe Currency | Select2 dropdown | | |
| 16 | Observe Currency Symbol | Text input | | |
| 17 | Observe Labels | Select2 multi-select | | |
| 18 | Observe buttons | "Save" and "Close" buttons visible (no "Save & continue") | | |

#### TC-LEAD-012: Close Add lead modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click X (close) button | Modal closes with animation | Low | User is logged in as Admin, Add lead modal is open |
| 2 | Observe page | Modal is hidden, overlay removed | | |

#### TC-LEAD-013: Default type is Organization

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe Type radio | "Organization" is checked by default | Medium | User is logged in as Admin, Add lead modal is open |
| 2 | | "Person" is NOT checked | | |

#### TC-LEAD-014: Switch type to Person

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Person" radio | "Person" radio becomes checked, "Organization" unchecked | Medium | User is logged in as Admin, Add lead modal is open |
| 2 | Observe form | Company name label changes from "Company name" to "Name" | | |

### 3.5 Validation

#### TC-LEAD-015: Validate required fields - empty form

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Leave all fields empty | All fields blank | High | User is logged in as Admin, Add lead modal is open |
| 2 | Click "Save" | Modal stays open, form NOT submitted | | |
| 3 | Observe Company name field | Red error message: "This field is required." | | |

#### TC-LEAD-015a: Validate Company name with only whitespace

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "   " (spaces only) | Whitespace entered | Medium | User is logged in as Admin, Add lead modal is open |
| 2 | Click "Save" | Form should NOT submit, or trims whitespace and shows required error | | |

### 3.6 Create Lead - Organization

#### TC-LEAD-016: Create Organization lead with mandatory fields only

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Verify "Organization" is selected | Radio checked | High | User is logged in as Admin, Add lead modal is open |
| 2 | Enter Company name: "Lead Org Mandatory [timestamp]" | Value entered | | |
| 3 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 4 | Observe table | New lead "Lead Org Mandatory [timestamp]" appears with Status = "New" | | |

#### TC-LEAD-017: Create Organization lead with all fields

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Select "Organization" type | Checked | High | User is logged in as Admin, Add lead modal is open |
| 2 | Enter Company name: "Lead Org Full [timestamp]" | Value entered | | |
| 3 | Enter Address: "789 Tran Hung Dao Street" | Value entered | | |
| 4 | Enter City: "Ha Noi" | Value entered | | |
| 5 | Enter State: "HN" | Value entered | | |
| 6 | Enter Zip: "100000" | Value entered | | |
| 7 | Enter Country: "Vietnam" | Value entered | | |
| 8 | Enter Phone: "0987654321" | Value entered | | |
| 9 | Enter Website: "https://lead-org-full.com" | Value entered | | |
| 10 | Enter VAT Number: "VAT-LEAD-001" | Value entered | | |
| 11 | Enter GST Number: "GST-LEAD-001" | Value entered | | |
| 12 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 13 | Observe table | New lead "Lead Org Full [timestamp]" appears with correct data | | |

### 3.7 Create Lead - Person

#### TC-LEAD-018: Create Person lead with mandatory fields only

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Person" radio | Person selected, label changes to "Name" | High | User is logged in as Admin, Add lead modal is open |
| 2 | Enter Name: "Lead Person Mandatory [timestamp]" | Value entered | | |
| 3 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 4 | Observe table | New lead "Lead Person Mandatory [timestamp]" appears | | |

#### TC-LEAD-019: Create Person lead with all fields

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Person" radio | Person selected | Medium | User is logged in as Admin, Add lead modal is open |
| 2 | Enter Name: "Lead Person Full [timestamp]" | Value entered | | |
| 3 | Enter Address: "321 Hai Ba Trung Street" | Value entered | | |
| 4 | Enter City: "Da Nang" | Value entered | | |
| 5 | Enter State: "DN" | Value entered | | |
| 6 | Enter Zip: "550000" | Value entered | | |
| 7 | Enter Country: "Vietnam" | Value entered | | |
| 8 | Enter Phone: "0976543210" | Value entered | | |
| 9 | Enter Website: "https://lead-person-full.com" | Value entered | | |
| 10 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 11 | Observe table | New lead "Lead Person Full [timestamp]" appears with correct data | | |

### 3.8 Boundary Value & Special Data

#### TC-LEAD-020: Validate Company name - very long input (255+ characters)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: 256 character string | Value entered or truncated | Medium | User is logged in as Admin, Add lead modal is open |
| 2 | Click "Save" | Either: (a) Lead created with truncated name, or (b) Error about max length | | |

#### TC-LEAD-021: Create lead with Vietnamese characters

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "Khach hang tiem nang Sai Gon" | Vietnamese characters accepted | Medium | User is logged in as Admin, Add lead modal is open |
| 2 | Click "Save" | Modal closes, lead created successfully | | |
| 3 | Observe table | Lead name displays correctly with Vietnamese diacritical marks (no garbled text) | | |

### 3.9 Business Rule - Status Verification

#### TC-LEAD-022: Verify lead status displays correctly after creation

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: "Lead Status Test [timestamp]" | Value entered | High | User is logged in as Admin, Add lead modal is open |
| 2 | Select Status: "Qualified" | Status set to Qualified | | |
| 3 | Click "Save" | Modal closes | | |
| 4 | Search for "Lead Status Test [timestamp]" | Lead found in table | | |
| 5 | Verify Status column | Status displays "Qualified" (not default "New") | | |

### 3.10 Security

#### TC-LEAD-023: XSS prevention in Company name field

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Company name: `<img src=x onerror=alert('XSS')>` | Value entered as text | High | User is logged in as Admin, Add lead modal is open |
| 2 | Click "Save" | Lead created or input rejected | | |
| 3 | Observe table | No JavaScript executed. Name displays as escaped/sanitized text | | |

---

## 4. Projects

### 4.1 Page Display

#### TC-PRJ-001: Verify Projects page loads

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Navigate to `/projects/all_projects` | Page loads without error, HTTP status 200 | High | User is logged in as Admin |
| 2 | Observe URL | URL contains `/projects` | | |
| 3 | Observe page title | Title contains "Projects" | | |

#### TC-PRJ-002: Verify action buttons display

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe header buttons | "Add project" button is visible and clickable | High | User is logged in as Admin, on `/projects/all_projects` |
| 2 | | "Manage labels" button is visible and clickable | | |
| 3 | | "Import projects" button is visible and clickable | | |

#### TC-PRJ-003: Verify project table headers

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe table headers | Headers displayed: ID, Title, Client, Price, Start date, Deadline, Progress, Status | Medium | User is logged in as Admin, on `/projects/all_projects` |

#### TC-PRJ-004: Verify project data rows exist

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Navigate to `/projects/all_projects` | Project table visible | Medium | User is logged in as Admin, at least 1 project exists |
| 2 | Observe table body | At least 1 data row is displayed (not empty state) | | |

### 4.2 Filters

#### TC-PRJ-005: Verify status filter options exist

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe filter sidebar | Status filters present: Open, Completed, Hold, Canceled | Medium | User is logged in as Admin, on `/projects/all_projects` |

#### TC-PRJ-006: Verify export buttons

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe export area | "Excel" button is visible and clickable | Medium | User is logged in as Admin, on `/projects/all_projects` |
| 2 | | "Print" button is visible and clickable | | |

### 4.3 Search

#### TC-PRJ-007: Search projects by keyword

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Note initial row count (e.g., N rows) | Count recorded | High | User is logged in as Admin, on `/projects/all_projects`, at least 1 project exists |
| 2 | Enter "test" in search input | Table filters in real-time | | |
| 3 | Observe filtered results | Only rows containing "test" are shown, filtered count <= N | | |
| 4 | Clear search input | Table returns to N rows | | |

### 4.4 Add Project Modal

#### TC-PRJ-008: Open Add project modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Add project" button | Modal dialog opens with overlay | High | User is logged in as Admin, on `/projects/all_projects` |
| 2 | Observe modal title | Title text is "Add project" | | |

#### TC-PRJ-009: Verify all form fields in Add project modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe Title | Text input, placeholder "Title", required | High | User is logged in as Admin, Add project modal is open |
| 2 | Observe Project type | Select2 dropdown: "Client Project" (default), "Internal Project" | | |
| 3 | Observe Client | Select2 autocomplete, visible when type = "Client Project", required conditionally | | |
| 4 | Observe Description | Textarea | | |
| 5 | Observe Start date | Date picker input, placeholder "Start date" | | |
| 6 | Observe Deadline | Date picker input, placeholder "Deadline" | | |
| 7 | Observe Price | Text input, placeholder "Price" | | |
| 8 | Observe Labels | Select2 multi-select | | |
| 9 | Observe buttons | "Save", "Save & continue", "Close" buttons visible | | |

#### TC-PRJ-010: Close Add project modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click X (close) button | Modal closes with animation | Low | User is logged in as Admin, Add project modal is open |
| 2 | Observe page | Modal is hidden, overlay removed | | |

#### TC-PRJ-011: Verify Project type toggle hides/shows Client field

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe default project type | "Client Project" is selected | High | User is logged in as Admin, Add project modal is open |
| 2 | Observe Client field | Client dropdown is visible and marked as required | | |
| 3 | Change Project type to "Internal Project" | Client field becomes hidden/removed | | |
| 4 | Change back to "Client Project" | Client field becomes visible and required again | | |

### 4.5 Validation

#### TC-PRJ-012: Validate required fields - empty form

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Leave all fields empty | All fields blank | High | User is logged in as Admin, Add project modal is open |
| 2 | Click "Save" | Modal stays open, form NOT submitted | | |
| 3 | Observe Title field | Red error message: "This field is required." | | |
| 4 | Observe Client field | Red error message: "This field is required." (default type is Client Project) | | |

#### TC-PRJ-012a: Validate Price field with negative number

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Negative Price Test" | Value entered | Medium | User is logged in as Admin, Add project modal is open |
| 2 | Select a Client | Client selected | | |
| 3 | Enter Price: "-5000" | Negative value entered | | |
| 4 | Click "Save" | Either: (a) Error about invalid price, or (b) System rejects negative value | | |

#### TC-PRJ-012b: Validate Price field with text input

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Text Price Test" | Value entered | Medium | User is logged in as Admin, Add project modal is open |
| 2 | Select a Client | Client selected | | |
| 3 | Enter Price: "abc" | Non-numeric text entered | | |
| 4 | Click "Save" | Either: (a) Error about invalid format, or (b) Field rejects non-numeric input | | |

#### TC-PRJ-012c: Validate Deadline before Start date

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Date Validation Test" | Value entered | High | User is logged in as Admin, Add project modal is open |
| 2 | Select a Client | Client selected | | |
| 3 | Enter Start date: "12/31/2026" | Start date set | | |
| 4 | Enter Deadline: "01/01/2026" | Deadline BEFORE start date | | |
| 5 | Click "Save" | Either: (a) Error "Deadline must be after Start date", or (b) System prevents saving | | |

### 4.6 Create Project

#### TC-PRJ-013: Create project with mandatory fields only (Client Project)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Project Mandatory [timestamp]" | Value entered | High | User is logged in as Admin, Add project modal is open, at least 1 client exists |
| 2 | Select a Client from dropdown | Client name displayed in select | | |
| 3 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 4 | Observe table | New project "Project Mandatory [timestamp]" appears | | |

#### TC-PRJ-014: Create project with all fields (Client Project)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Project Full [timestamp]" | Value entered | High | User is logged in as Admin, Add project modal is open, at least 1 client exists |
| 2 | Select a Client | Client name displayed | | |
| 3 | Enter Description: "Full project description" | Value entered | | |
| 4 | Enter Start date: "06/20/2026" | Date set in picker | | |
| 5 | Enter Deadline: "12/31/2026" | Date set in picker | | |
| 6 | Enter Price: "15000" | Value entered | | |
| 7 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 8 | Observe table | New project appears with Title, Client, Price, dates displayed correctly | | |

#### TC-PRJ-015: Create Internal Project (no client required)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Change Project type to "Internal Project" | Client field hidden | High | User is logged in as Admin, Add project modal is open |
| 2 | Enter Title: "Internal Project [timestamp]" | Value entered | | |
| 3 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 4 | Observe table | New project appears, Client column is empty/blank | | |

### 4.7 Boundary Value

#### TC-PRJ-016: Validate Title - very long input (255+ characters)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: 256 character string | Value entered or truncated | Medium | User is logged in as Admin, Add project modal is open |
| 2 | Select a Client | Client selected | | |
| 3 | Click "Save" | Either: (a) Project created with truncated title, or (b) Error about max length | | |

#### TC-PRJ-017: Validate Price boundary - zero value

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Zero Price Project" | Value entered | Medium | User is logged in as Admin, Add project modal is open |
| 2 | Select a Client | Client selected | | |
| 3 | Enter Price: "0" | Zero value entered | | |
| 4 | Click "Save" | Project created successfully with Price = 0 | | |

#### TC-PRJ-018: Validate Price boundary - very large number

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Large Price Project" | Value entered | Medium | User is logged in as Admin, Add project modal is open |
| 2 | Select a Client | Client selected | | |
| 3 | Enter Price: "99999999999" | Very large value entered | | |
| 4 | Click "Save" | Either: (a) Project created with correct price, or (b) Error about max value | | |

### 4.8 Data Validation

#### TC-PRJ-019: Verify created project data displays correctly

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Search for "Project Full [timestamp]" | Project row found | High | Project "Project Full [timestamp]" created via TC-PRJ-014 |
| 2 | Verify Title column | Displays "Project Full [timestamp]" | | |
| 3 | Verify Client column | Displays the selected client name | | |
| 4 | Verify Price column | Displays "15,000" or "15000" | | |
| 5 | Verify Start date | Displays "06/20/2026" or equivalent format | | |
| 6 | Verify Deadline | Displays "12/31/2026" or equivalent format | | |
| 7 | Verify Status | Displays "Open" (default) | | |

---

## 5. Tasks

### 5.1 Page Display

#### TC-TASK-001: Verify Tasks page loads

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Navigate to `/tasks/all_tasks` | Page loads without error, HTTP status 200 | High | User is logged in as Admin |
| 2 | Observe URL | URL contains `/tasks` | | |
| 3 | Observe content | Task data table is visible with rows | | |

#### TC-TASK-002: Verify action buttons display

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe header buttons | "Add task" button is visible and clickable | High | User is logged in as Admin, on `/tasks/all_tasks` |
| 2 | | "Manage labels" button is visible and clickable | | |
| 3 | | "Import tasks" button is visible and clickable | | |

#### TC-TASK-003: Verify view tabs display

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe tabs | "List" tab visible and active (highlighted) | Medium | User is logged in as Admin, on `/tasks/all_tasks` |
| 2 | | "Kanban" tab visible | | |
| 3 | | "Gantt" tab visible | | |

#### TC-TASK-004: Verify task table headers

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe table headers | Headers displayed: ID, Title, Start date, Deadline, Milestone, Related to, Assigned to, Collaborators, Status | Medium | User is logged in as Admin, on `/tasks/all_tasks` |

#### TC-TASK-005: Verify task data rows exist

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Navigate to `/tasks/all_tasks` | Task table visible | Medium | User is logged in as Admin, at least 1 task exists |
| 2 | Observe table body | At least 1 data row is displayed (not empty state) | | |

### 5.2 View Switching

#### TC-TASK-006: Switch to Kanban view

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Kanban" tab | Kanban board loads successfully | High | User is logged in as Admin, on `/tasks/all_tasks` list view |
| 2 | Observe URL | URL contains `/kanban` | | |
| 3 | Observe columns | Kanban columns displayed: To do, In progress, Review, Done | | |

#### TC-TASK-007: Switch to Gantt view

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Gantt" tab | Gantt chart loads successfully | High | User is logged in as Admin, on `/tasks/all_tasks` list view |
| 2 | Observe URL | URL contains `/gantt` | | |
| 3 | Observe content | Gantt timeline/chart is visible | | |

#### TC-TASK-008: Switch back to List view

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "List" tab | List view loads | Medium | User is logged in as Admin, on Tasks Kanban view |
| 2 | Observe URL | URL contains `/all_tasks` | | |
| 3 | Observe content | Task data table is visible with rows | | |

### 5.3 Search & Filters

#### TC-TASK-009: Search tasks by keyword

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Note initial row count (e.g., N rows) | Count recorded | High | User is logged in as Admin, on `/tasks/all_tasks`, at least 1 task exists |
| 2 | Enter "design" in search input | Table filters in real-time | | |
| 3 | Observe results | Only rows containing "design" are shown, filtered count <= N | | |
| 4 | Clear search input | Table returns to N rows | | |

#### TC-TASK-010: Verify status filter options exist

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe filter sidebar | Status filters present: To do, In progress, Review, Done | Medium | User is logged in as Admin, on `/tasks/all_tasks` |

#### TC-TASK-011: Verify export buttons

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe export area | "Excel" button is visible and clickable | Medium | User is logged in as Admin, on `/tasks/all_tasks` |
| 2 | | "Print" button is visible and clickable | | |

### 5.4 Add Task Modal

#### TC-TASK-012: Open Add task modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click "Add task" button | Modal dialog opens with overlay | High | User is logged in as Admin, on `/tasks/all_tasks` |
| 2 | Observe modal title | Title text is "Add task" | | |

#### TC-TASK-013: Verify all form fields in Add task modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe Title | Text input, placeholder "Title", required | High | User is logged in as Admin, Add task modal is open |
| 2 | Observe Description | Textarea | | |
| 3 | Observe Related to | Select2 dropdown with options: -, Project, Client, Contract, Estimate, Expense, Invoice, Lead, Order, Proposal, Subscription, Ticket | | |
| 4 | Observe Points | Select2 dropdown: 1-5 Points | | |
| 5 | Observe Milestone | Select2 autocomplete | | |
| 6 | Observe Assign to | Select2 autocomplete | | |
| 7 | Observe Collaborators | Select2 multi-select | | |
| 8 | Observe Status | Select2 dropdown: To do, In progress, Review, Done | | |
| 9 | Observe Priority | Select2 dropdown: -, Minor, Major, Critical, Blocker | | |
| 10 | Observe Labels | Select2 multi-select | | |
| 11 | Observe Start date | Date picker, placeholder "DD-MM-YYYY" | | |
| 12 | Observe Deadline | Date picker, placeholder "DD-MM-YYYY" | | |
| 13 | Observe Recurring | Checkbox, unchecked by default | | |
| 14 | Observe buttons | "Save", "Save & show", "Close" buttons visible | | |

#### TC-TASK-014: Close Add task modal

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Click X (close) button | Modal closes with animation | Low | User is logged in as Admin, Add task modal is open |
| 2 | Observe page | Modal is hidden, overlay removed | | |

#### TC-TASK-015: Verify Related to changes context dropdown

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Select "Project" in Related to | Secondary "Project" dropdown appears below | High | User is logged in as Admin, Add task modal is open |
| 2 | Select "Client" in Related to | "Client" dropdown appears, "Project" dropdown hidden | | |
| 3 | Select "-" (general) in Related to | No secondary context dropdown shown | | |

#### TC-TASK-016: Verify Recurring checkbox toggles fields

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Observe Recurring section | Only checkbox visible, recurring fields hidden | High | User is logged in as Admin, Add task modal is open |
| 2 | Check "Recurring" checkbox | Fields appear: "Repeat every", "Repeat type", "Cycles", "Next recurring" | | |
| 3 | Uncheck "Recurring" checkbox | Recurring fields hidden again | | |

### 5.5 Validation

#### TC-TASK-017: Validate required fields - empty form

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Leave all fields empty | All fields blank | High | User is logged in as Admin, Add task modal is open |
| 2 | Click "Save" | Modal stays open, form NOT submitted | | |
| 3 | Observe Title field | Red error message: "This field is required." | | |

#### TC-TASK-017a: Validate Title with only whitespace

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "   " (spaces only) | Whitespace entered | Medium | User is logged in as Admin, Add task modal is open |
| 2 | Click "Save" | Form should NOT submit, or trims whitespace and shows required error | | |

#### TC-TASK-017b: Validate Deadline before Start date

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Date Validation Task" | Value entered | High | User is logged in as Admin, Add task modal is open |
| 2 | Enter Start date: "31-12-2026" | Start date set | | |
| 3 | Enter Deadline: "01-01-2026" | Deadline BEFORE start date | | |
| 4 | Click "Save" | Either: (a) Error about invalid date range, or (b) System prevents saving | | |

### 5.6 Create Task

#### TC-TASK-018: Create task with mandatory fields only

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Task Mandatory [timestamp]" | Value entered | High | User is logged in as Admin, Add task modal is open |
| 2 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 3 | Observe table | New task "Task Mandatory [timestamp]" appears with Status = "To do" | | |

#### TC-TASK-019: Create task with all fields

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Task Full [timestamp]" | Value entered | High | User is logged in as Admin, Add task modal is open, at least 1 project and team member exist |
| 2 | Select Related to: "Project" | Project dropdown appears | | |
| 3 | Select a Project from dropdown | Project name displayed | | |
| 4 | Select Assign to: a team member | Member name displayed | | |
| 5 | Select Status: "In progress" | Status set | | |
| 6 | Select Priority: "Major" | Priority set | | |
| 7 | Enter Start date: "20-06-2026" | Date entered | | |
| 8 | Enter Deadline: "31-12-2026" | Date entered | | |
| 9 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 10 | Observe table | New task "Task Full [timestamp]" appears with Status = "In progress" | | |

#### TC-TASK-020: Create task with recurring enabled

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Recurring Task [timestamp]" | Value entered | High | User is logged in as Admin, Add task modal is open |
| 2 | Check "Recurring" checkbox | Recurring fields appear | | |
| 3 | Enter Repeat every: "1" | Value entered | | |
| 4 | Select Repeat type: "Week(s)" | Type selected | | |
| 5 | Enter Cycles: "4" | Value entered | | |
| 6 | Click "Save" | Modal closes, success toast/notification displayed | | |
| 7 | Observe table | New task "Recurring Task [timestamp]" appears | | |

### 5.7 Boundary Value & Special Data

#### TC-TASK-021: Validate Title - very long input (255+ characters)

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: 256 character string | Value entered or truncated | Medium | User is logged in as Admin, Add task modal is open |
| 2 | Click "Save" | Either: (a) Task created with truncated title, or (b) Error about max length | | |

#### TC-TASK-022: Validate Recurring Cycles - zero value

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Zero Cycles Task" | Value entered | Medium | User is logged in as Admin, Add task modal is open, Recurring checked |
| 2 | Check "Recurring" checkbox | Recurring fields appear | | |
| 3 | Enter Repeat every: "1", Repeat type: "Week(s)" | Values set | | |
| 4 | Enter Cycles: "0" | Zero value entered | | |
| 5 | Click "Save" | Either: (a) Error about invalid cycles, or (b) Task created with 0 cycles (infinite) | | |

#### TC-TASK-023: Validate Recurring Cycles - negative value

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Negative Cycles Task" | Value entered | Medium | User is logged in as Admin, Add task modal is open, Recurring checked |
| 2 | Check "Recurring" checkbox | Recurring fields appear | | |
| 3 | Enter Repeat every: "1", Repeat type: "Week(s)" | Values set | | |
| 4 | Enter Cycles: "-1" | Negative value entered | | |
| 5 | Click "Save" | Either: (a) Error about invalid cycles, or (b) Field rejects negative input | | |

#### TC-TASK-024: Create task with Vietnamese characters

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Thiet ke giao dien nguoi dung" | Vietnamese characters accepted | Medium | User is logged in as Admin, Add task modal is open |
| 2 | Click "Save" | Modal closes, task created successfully | | |
| 3 | Observe table | Task title displays correctly with Vietnamese diacritical marks (no garbled text) | | |

#### TC-TASK-025: Create task with special characters

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Bug #123 - Fix <header> & 'footer' @v2.0" | Special characters entered | Medium | User is logged in as Admin, Add task modal is open |
| 2 | Click "Save" | Modal closes, task created | | |
| 3 | Observe table | Task title displays correctly with all special characters preserved | | |

### 5.8 Security

#### TC-TASK-026: XSS prevention in Title field

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: `<script>document.cookie</script>` | Value entered as text | High | User is logged in as Admin, Add task modal is open |
| 2 | Click "Save" | Task created or input rejected | | |
| 3 | Observe table | No JavaScript executed. Title displays as escaped/sanitized text | | |

#### TC-TASK-027: SQL Injection prevention in Title field

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: `'; DROP TABLE tasks; --` | Value entered as text | High | User is logged in as Admin, Add task modal is open |
| 2 | Click "Save" | No server error (no HTTP 500). Task created with literal text or input rejected | | |
| 3 | Observe system | Application functions normally, all data intact | | |

### 5.9 Data Validation

#### TC-TASK-028: Verify created task data displays correctly

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Search for "Task Full [timestamp]" | Task row found | High | Task "Task Full [timestamp]" created via TC-TASK-019 |
| 2 | Verify Title column | Displays "Task Full [timestamp]" | | |
| 3 | Verify Status column | Displays "In progress" | | |
| 4 | Verify Start date | Displays "20-06-2026" or equivalent format | | |
| 5 | Verify Deadline | Displays "31-12-2026" or equivalent format | | |
| 6 | Click on task to open detail | Task detail page/modal opens | | |
| 7 | Verify Related to | Shows correct project name | | |
| 8 | Verify Assigned to | Shows correct team member | | |
| 9 | Verify Priority | Shows "Major" | | |

### 5.10 Error Handling

#### TC-TASK-029: Handle network error during task creation

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Network Error Task" | Value entered | Medium | User is logged in as Admin, Add task modal is open |
| 2 | Disconnect network (disable Wi-Fi/Ethernet) | Network disconnected | | |
| 3 | Click "Save" | Request fails | | |
| 4 | Observe UI | User-friendly error message displayed (not raw error/stack trace). No data loss | | |
| 5 | Reconnect network | Network restored | | |
| 6 | Click "Save" again | Task created successfully | | |

#### TC-TASK-030: Handle server timeout during task creation

| Step | Action | Expected Result | Priority | Preconditions |
|------|--------|-----------------|----------|---------------|
| 1 | Enter Title: "Timeout Task" | Value entered | Low | Server configured with low timeout or simulated slow response |
| 2 | Click "Save" (with simulated slow server) | Request times out | | |
| 3 | Observe UI | User-friendly timeout message displayed. No infinite loading spinner. User can retry | | |

---

## Test Case Summary

| Module | TC Count | Coverage Areas |
|--------|----------|----------------|
| Dashboard | 29 | Page display, widgets (statistics, projects overview, invoices, income/expenses, tasks, team, tickets), charts, clock in/out, timeline, events, my tasks, to-do, sticky note, quick actions, open projects, dashboard management |
| Clients | 26 | Page display, tabs, export, modal, validation (empty/whitespace/URL/phone), create Org (mandatory/full), create Person (mandatory/full), search, boundary (min/max length), special data (Vietnamese/special chars), security (XSS/SQLi), data validation |
| Leads | 23 | Page display, tabs, views, export, modal, validation (empty/whitespace), create Org (mandatory/full), create Person (mandatory/full), search, boundary (max length), special data (Vietnamese), status verification, security (XSS) |
| Projects | 19 | Page display, filters, export, modal, validation (empty/price negative/text/date range), create Client Project (mandatory/full), create Internal, search, boundary (title length/price zero/large), data validation |
| Tasks | 30 | Page display, tabs, views, filters, export, modal, validation (empty/whitespace/date range), create (mandatory/full), recurring, boundary (title length/cycles zero/negative), special data (Vietnamese/special chars), security (XSS/SQLi), data validation, error handling (network/timeout) |
| **Total** | **127** | |

---

## Review Checklist Compliance

| # | Checklist Item | Status | Notes |
|---|---------------|--------|-------|
| 1 | Requirement Coverage | ✅ | 5 modules covered: Dashboard, Clients, Leads, Projects, Tasks |
| 2 | Test Case Structure | ✅ | Priority + Preconditions added to all 127 TCs |
| 3 | Positive Cases | ✅ | Happy path for all create operations across all modules |
| 4 | Negative Cases | ✅ | Empty form, whitespace, invalid URL, invalid phone, invalid price, invalid date range |
| 5 | Boundary Cases | ✅ | Min/max name length, price zero/negative/large, cycles zero/negative |
| 6 | Equivalence Partitioning | ✅ | Valid/invalid data groups for each field type |
| 7 | Business Rules | ✅ | Type toggle, client visibility, recurring toggle, status, Related to |
| 8 | Integration Coverage | ⚠️ | Cross-module via create flows (Project needs Client); API tests in separate spec files |
| 9 | Data Validation | ✅ | Verify data in table/detail after creation for each module |
| 10 | UI Validation | ✅ | Form fields, labels, placeholders, buttons, table columns verified |
| 11 | Error Handling | ✅ | Network error + timeout scenarios (Tasks module) |
| 12 | Security | ✅ | XSS + SQL Injection tests for Clients, Leads, Tasks |
| 13 | Regression Impact | ⚠️ | Depends on project change scope |
| 14 | Reusability | ✅ | No duplicate TCs, consistent structure |
| 15 | Test Data | ✅ | Vietnamese (diacritical marks), special characters, long strings |
| 16 | Automation Readiness | ✅ | Steps clear, data uses [timestamp], results verifiable |
| 17 | Quality Score | ✅ ~90 | Approve threshold reached |
