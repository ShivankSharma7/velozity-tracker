# Velozity Tracker
**Developed by Shivank Sharma**

Velozity Tracker is a professional project management application designed for high-performance data handling. The system is built to synchronize tasks across three distinct views—Kanban, List, and Timeline—while maintaining a fluid user experience even under heavy data loads.

---

## Performance Metrics
The application has been audited using Google Lighthouse to ensure industry-standard performance. Even when handling over 500 active tasks via the Stress Test feature, the system maintains peak efficiency.

| Category | Score |
| :--- | :--- |
| Performance | 100 / 100 |
| Accessibility | 93 / 100 |
| Best Practices | 100 / 100 |
| SEO | 90 / 100 |

---

## Technical Features

### 1. Custom Virtual Scrolling
To prevent browser lag when rendering large datasets, I implemented a mathematical windowing logic for the List View. Instead of rendering hundreds of DOM nodes at once, the system calculates the container's scroll position and renders only the visible rows. This ensures the application remains responsive and achieves a perfect 100 performance score.

### 2. Native Drag-and-Drop
The Kanban board utilizes the native HTML5 Drag and Drop API. By avoiding heavy third-party libraries, the application bundle remains lightweight, and the interaction feels instantaneous. Tasks can be moved between columns, and the global state is updated in real-time across all views.

### 3. Integrated Timeline View
The Timeline provides a Gantt-style waterfall visualization of project tasks. It maps tasks to specific dates and applies color-coded accents based on priority levels (Critical, High, Medium, Low), allowing users to identify urgent objectives at a glance.

### 4. Robust State Management
The application uses the React Context API combined with the useReducer hook. This centralized architecture ensures that any update made in the Kanban board is immediately reflected in the List and Timeline views without any data inconsistency.

---

## Project Views
* **Kanban Board:** A traditional drag-and-drop interface for managing task stages.
* **Virtualized List:** A high-speed table designed for scanning through large quantities of data.
* **Gantt Timeline:** A date-based visualization for tracking project progress over time.
* **Stress Test Engine:** A diagnostic tool that injects 500 randomized tasks to verify system stability and performance.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ShivankSharma7/Velozity-Tracker.git
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

**Developed by Shivank Sharma | March 2026**

Would you like me to help you draft the final email or portal message for your submission?
