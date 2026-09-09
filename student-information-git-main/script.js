/* ============================================================
   Student Information & Analytics Portal
   Interactive Dashboard Logic
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     DATA
     -------------------------------------------------------- */

  /** Student records (demo/fictional data) */
  const students = [
    { name: 'Aarav Mehta',    id: 'STU-2026-001', department: 'Computer Science',        year: 'II',  attendance: 94, performance: 91, status: 'Excellent',       color: '#36454F' },
    { name: 'Ananya Sharma',  id: 'STU-2026-002', department: 'Data Science',             year: 'III', attendance: 91, performance: 89, status: 'Excellent',       color: '#3D4C3C' },
    { name: 'Rahul Nair',     id: 'STU-2026-003', department: 'Information Technology',   year: 'II',  attendance: 86, performance: 82, status: 'Good',            color: '#44366B' },
    { name: 'Priya Menon',    id: 'STU-2026-004', department: 'Mathematics',              year: 'I',   attendance: 89, performance: 87, status: 'Good',            color: '#8C7355' },
    { name: 'Aditya Rao',     id: 'STU-2026-005', department: 'Engineering',              year: 'III', attendance: 78, performance: 74, status: 'Needs Attention', color: '#A45A3C' },
    { name: 'Neha Kapoor',    id: 'STU-2026-006', department: 'Management',               year: 'II',  attendance: 92, performance: 88, status: 'Excellent',       color: '#6B2737' },
    { name: 'Karthik Iyer',   id: 'STU-2026-007', department: 'Computer Science',        year: 'I',   attendance: 90, performance: 86, status: 'Good',            color: '#36454F' },
    { name: 'Divya Pillai',   id: 'STU-2026-008', department: 'Data Science',             year: 'II',  attendance: 95, performance: 93, status: 'Excellent',       color: '#3D4C3C' },
    { name: 'Arjun Desai',    id: 'STU-2026-009', department: 'Engineering',              year: 'IV',  attendance: 82, performance: 79, status: 'Good',            color: '#5B3A6B' },
    { name: 'Sneha Reddy',    id: 'STU-2026-010', department: 'Information Technology',   year: 'III', attendance: 73, performance: 70, status: 'Needs Attention', color: '#8C5A20' },
    { name: 'Vikram Singh',   id: 'STU-2026-011', department: 'Mathematics',              year: 'II',  attendance: 88, performance: 84, status: 'Good',            color: '#44366B' },
    { name: 'Meera Joshi',    id: 'STU-2026-012', department: 'Management',               year: 'I',   attendance: 96, performance: 92, status: 'Excellent',       color: '#2B3D4F' },
  ];

  /** Department data */
  const departments = [
    { name: 'Computer Science',        students: 2840, attendance: 91, performance: 88 },
    { name: 'Information Technology',   students: 2160, attendance: 89, performance: 85 },
    { name: 'Mathematics',             students: 1420, attendance: 86, performance: 81 },
    { name: 'Management',              students: 1980, attendance: 84, performance: 79 },
    { name: 'Data Science',            students: 1240, attendance: 93, performance: 91 },
    { name: 'Engineering',             students: 3206, attendance: 87, performance: 82 },
  ];

  /** Enrollment chart data */
  const enrollmentData = [
    { month: 'Jan', value: 10820 },
    { month: 'Feb', value: 10940 },
    { month: 'Mar', value: 11120 },
    { month: 'Apr', value: 11340 },
    { month: 'May', value: 11580 },
    { month: 'Jun', value: 11920 },
    { month: 'Jul', value: 12140 },
    { month: 'Aug', value: 12360 },
    { month: 'Sep', value: 12520 },
    { month: 'Oct', value: 12640 },
    { month: 'Nov', value: 12760 },
    { month: 'Dec', value: 12846 },
  ];

  /** Attendance distribution */
  const attendanceDistribution = [
    { label: 'Excellent',        count: 4820, total: 12846, color: '#3D4C3C' },
    { label: 'Good',             count: 5430, total: 12846, color: '#36454F' },
    { label: 'Needs Attention',  count: 1722, total: 12846, color: '#8C7355' },
    { label: 'Critical',         count: 874,  total: 12846, color: '#932929' },
  ];

  /* --------------------------------------------------------
     DOM REFERENCES
     -------------------------------------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  /* --------------------------------------------------------
     UTILITY HELPERS
     -------------------------------------------------------- */

  /** Format number with commas */
  function formatNumber(n) {
    return n.toLocaleString('en-IN');
  }

  /** Get initials from a name */
  function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase();
  }

  /** Dynamic greeting based on time of day */
  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  /** Format today's date */
  function formatDate(date) {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  /* --------------------------------------------------------
     LOADING SCREEN
     -------------------------------------------------------- */
  function initLoadingScreen() {
    const loadingScreen = $('#loadingScreen');
    const app = $('#app');

    // Simulate load
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      app.classList.add('loaded');

      // Trigger reveal animations after dashboard is visible
      setTimeout(initScrollReveal, 200);
      setTimeout(animateKPICounters, 400);
      setTimeout(renderEnrollmentChart, 600);
      setTimeout(animateProgressBars, 800);
      setTimeout(animateCircleProgress, 1000);
    }, 800);
  }

  /* --------------------------------------------------------
     DATE & GREETING
     -------------------------------------------------------- */
  function initDateAndGreeting() {
    const now = new Date();
    const greeting = getGreeting();
    $('#welcomeGreeting').textContent = `${greeting}, Nethu`;
    $('#welcomeDate').textContent = formatDate(now);
    $('#currentDate').textContent = now.toLocaleDateString('en-IN', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  }

  /* --------------------------------------------------------
     SIDEBAR
     -------------------------------------------------------- */
  function initSidebar() {
    const sidebar = $('#sidebar');
    const toggle = $('#sidebarToggle');
    const mobileBtn = $('#mobileMenuBtn');
    const overlay = $('#sidebarOverlay');
    const navItems = $$('.nav-item');

    // Desktop collapse/expand
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });

    // Mobile drawer
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    });

    // Nav active state
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(n => {
          n.classList.remove('active');
          n.removeAttribute('aria-current');
        });
        item.classList.add('active');
        item.setAttribute('aria-current', 'page');

        // Close mobile drawer
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('mobile-open');
          overlay.classList.remove('active');
        }

        showToast('info', 'Navigation', `Switched to ${item.querySelector('.nav-label').textContent}`);
      });
    });
  }

  /* --------------------------------------------------------
     DROPDOWNS
     -------------------------------------------------------- */
  function initDropdowns() {
    const notifBtn = $('#notifBtn');
    const notifMenu = $('#notifMenu');
    const profileBtn = $('#profileBtn');
    const profileMenu = $('#profileMenu');

    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.remove('open');
      notifMenu.classList.toggle('open');
    });

    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifMenu.classList.remove('open');
      profileMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      notifMenu.classList.remove('open');
      profileMenu.classList.remove('open');
    });
  }

  /* --------------------------------------------------------
     THEME TOGGLE
     -------------------------------------------------------- */
  function initThemeToggle() {
    const btn = $('#themeToggle');
    const lightIcon = $('#themeIconLight');
    const darkIcon = $('#themeIconDark');
    const html = document.documentElement;

    // Check saved theme
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      html.setAttribute('data-theme', 'dark');
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'block';
    }

    btn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.setAttribute('data-theme', 'light');
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  /* --------------------------------------------------------
     KPI COUNTER ANIMATION
     -------------------------------------------------------- */
  function animateKPICounters() {
    const cards = $$('.kpi-value');
    cards.forEach(card => {
      const target = parseFloat(card.dataset.target);
      const suffix = card.dataset.suffix || '';
      const isDecimal = card.dataset.decimal === 'true';
      const duration = 1800;
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;

        if (isDecimal) {
          card.textContent = current.toFixed(1) + suffix;
        } else {
          card.textContent = formatNumber(Math.floor(current)) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Final value
          if (isDecimal) {
            card.textContent = target.toFixed(1) + suffix;
          } else {
            card.textContent = formatNumber(target) + suffix;
          }
        }
      }

      requestAnimationFrame(step);
    });
  }

  /* --------------------------------------------------------
     ENROLLMENT CHART (SVG)
     -------------------------------------------------------- */
  function renderEnrollmentChart() {
    const container = $('#enrollmentChart');
    const tooltip = $('#chartTooltip');
    const width = container.clientWidth;
    const height = 320;
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const minVal = Math.min(...enrollmentData.map(d => d.value)) - 200;
    const maxVal = Math.max(...enrollmentData.map(d => d.value)) + 200;
    const range = maxVal - minVal;

    const barWidth = Math.min(chartW / enrollmentData.length * 0.55, 48);
    const gap = chartW / enrollmentData.length;

    // Build SVG
    let svg = `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">`;

    // Grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartH / gridLines) * i;
      const val = maxVal - (range / gridLines) * i;
      svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3,3" opacity="0.5"/>`;
      svg += `<text x="${padding.left - 8}" y="${y + 4}" text-anchor="end" fill="var(--text-tertiary)" font-size="11" font-family="Inter, sans-serif">${(val / 1000).toFixed(1)}k</text>`;
    }

    // Bars
    enrollmentData.forEach((d, i) => {
      const x = padding.left + gap * i + (gap - barWidth) / 2;
      const barH = ((d.value - minVal) / range) * chartH;
      const y = padding.top + chartH - barH;

      // Editorial alternating bar colors (Onyx black and camel)
      const isAccent = (i % 2 === 1);
      const barColor = isAccent ? 'var(--accent-camel)' : 'var(--text-primary)';
      const barClass = isAccent ? 'chart-bar accent' : 'chart-bar primary';
      svg += `<rect class="${barClass}" x="${x}" y="${padding.top + chartH}" width="${barWidth}" height="0" rx="0" fill="${barColor}" data-month="${d.month}" data-value="${d.value}">
        <animate attributeName="height" from="0" to="${barH}" dur="0.8s" fill="freeze" begin="${0.08 * i}s" calcMode="spline" keySplines="0.2 0 0 1"/>
        <animate attributeName="y" from="${padding.top + chartH}" to="${y}" dur="0.8s" fill="freeze" begin="${0.08 * i}s" calcMode="spline" keySplines="0.2 0 0 1"/>
      </rect>`;

      // Month label
      svg += `<text x="${x + barWidth / 2}" y="${height - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif">${d.month}</text>`;
    });

    svg += '</svg>';
    // Keep tooltip, remove previous SVG
    const existingSvg = container.querySelector('svg');
    if (existingSvg) existingSvg.remove();
    container.insertAdjacentHTML('afterbegin', svg);

    // Tooltip events
    container.querySelectorAll('.chart-bar').forEach(bar => {
      bar.addEventListener('mouseenter', (e) => {
        const month = bar.dataset.month;
        const value = parseInt(bar.dataset.value, 10);
        tooltip.textContent = `${month}: ${formatNumber(value)} students`;
        tooltip.classList.add('visible');
      });

      bar.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 30) + 'px';
      });

      bar.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    });
  }

  /* --------------------------------------------------------
     DEPARTMENT CARDS
     -------------------------------------------------------- */
  function renderDepartments() {
    const grid = $('#deptGrid');
    const colors = ['indigo', 'blue', 'green', 'amber', 'purple', 'blue'];

    grid.innerHTML = departments.map((dept, i) => `
      <div class="dept-card">
        <div class="dept-card-header">
          <div class="dept-name">${dept.name}</div>
          <div class="dept-students">${formatNumber(dept.students)} students</div>
        </div>
        <div class="dept-stat">
          <div class="dept-stat-header">
            <span class="dept-stat-label">Attendance</span>
            <span class="dept-stat-value">${dept.attendance}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${colors[i]}" data-width="${dept.attendance}"></div>
          </div>
        </div>
        <div class="dept-stat">
          <div class="dept-stat-header">
            <span class="dept-stat-label">Performance</span>
            <span class="dept-stat-value">${dept.performance}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${colors[i]}" data-width="${dept.performance}"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------
     PROGRESS BAR ANIMATION
     -------------------------------------------------------- */
  function animateProgressBars() {
    $$('.progress-fill').forEach(bar => {
      const width = bar.dataset.width;
      if (width) {
        setTimeout(() => { bar.style.width = width + '%'; }, 100);
      }
    });
  }

  /* --------------------------------------------------------
     STUDENT TABLE
     -------------------------------------------------------- */

  let currentStudents = [...students];
  let sortKey = '';
  let sortDir = 'asc';
  const PAGE_SIZE = 6;
  let currentPage = 1;

  function renderStudentTable() {
    const tbody = $('#studentTableBody');
    const start = (currentPage - 1) * PAGE_SIZE;
    const page = currentStudents.slice(start, start + PAGE_SIZE);

    tbody.innerHTML = page.map(s => {
      const statusClass = s.status === 'Excellent' ? 'excellent' :
                           s.status === 'Good' ? 'good' : 'attention';
      return `
        <tr>
          <td>
            <div class="student-cell">
              <div class="student-avatar-sm" style="background:${s.color}">${getInitials(s.name)}</div>
              <span class="student-name">${s.name}</span>
            </div>
          </td>
          <td>${s.id}</td>
          <td>${s.department}</td>
          <td>${s.year}</td>
          <td>${s.attendance}%</td>
          <td>${s.performance}%</td>
          <td><span class="status-badge ${statusClass}">${s.status}</span></td>
        </tr>
      `;
    }).join('');

    // Update info
    const total = currentStudents.length;
    const showing = Math.min(start + PAGE_SIZE, total);
    $('#tableInfo').textContent = `Showing ${start + 1}–${showing} of ${total} students`;

    // Pagination
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const pagDiv = $('#tablePagination');
    let pagHTML = '';

    pagHTML += `<button class="page-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>‹</button>`;
    for (let p = 1; p <= totalPages; p++) {
      pagHTML += `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }
    pagHTML += `<button class="page-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>›</button>`;
    pagDiv.innerHTML = pagHTML;

    // Bind pagination clicks
    pagDiv.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.page;
        if (val === 'prev' && currentPage > 1) currentPage--;
        else if (val === 'next' && currentPage < totalPages) currentPage++;
        else if (!isNaN(val)) currentPage = parseInt(val, 10);
        renderStudentTable();
      });
    });
  }

  function filterStudents() {
    const search = $('#studentSearch').value.toLowerCase();
    const dept = $('#deptFilter').value;
    const status = $('#statusFilter').value;

    currentStudents = students.filter(s => {
      const matchSearch = !search ||
        s.name.toLowerCase().includes(search) ||
        s.id.toLowerCase().includes(search) ||
        s.department.toLowerCase().includes(search);
      const matchDept = !dept || s.department === dept;
      const matchStatus = !status || s.status === status;
      return matchSearch && matchDept && matchStatus;
    });

    currentPage = 1;
    renderStudentTable();
  }

  function sortStudents(key) {
    if (sortKey === key) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDir = 'asc';
    }

    currentStudents.sort((a, b) => {
      let valA, valB;
      switch (key) {
        case 'name': valA = a.name; valB = b.name; break;
        case 'id': valA = a.id; valB = b.id; break;
        case 'department': valA = a.department; valB = b.department; break;
        case 'year': valA = a.year; valB = b.year; break;
        case 'attendance': valA = a.attendance; valB = b.attendance; break;
        case 'performance': valA = a.performance; valB = b.performance; break;
        case 'status': valA = a.status; valB = b.status; break;
        default: return 0;
      }

      if (typeof valA === 'string') {
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });

    // Update sort icons
    $$('.data-table thead th').forEach(th => {
      th.classList.remove('sorted');
      if (th.dataset.sort === key) {
        th.classList.add('sorted');
        const icon = th.querySelector('.sort-icon');
        icon.textContent = sortDir === 'asc' ? '↑' : '↓';
      } else {
        const icon = th.querySelector('.sort-icon');
        if (icon) icon.textContent = '↕';
      }
    });

    currentPage = 1;
    renderStudentTable();
  }

  function initStudentTable() {
    renderStudentTable();

    $('#studentSearch').addEventListener('input', filterStudents);
    $('#deptFilter').addEventListener('change', filterStudents);
    $('#statusFilter').addEventListener('change', filterStudents);

    $$('.data-table thead th[data-sort]').forEach(th => {
      th.addEventListener('click', () => sortStudents(th.dataset.sort));
    });
  }

  /* --------------------------------------------------------
     ATTENDANCE CIRCLES
     -------------------------------------------------------- */
  function renderAttendanceCircles() {
    const grid = $('#attendanceGrid');
    const circumference = 2 * Math.PI * 42; // radius = 42

    grid.innerHTML = attendanceDistribution.map(item => {
      const pct = (item.count / item.total) * 100;
      const offset = circumference - (circumference * pct / 100);

      return `
        <div class="attendance-card">
          <div class="circle-progress">
            <svg viewBox="0 0 100 100">
              <circle class="circle-bg" cx="50" cy="50" r="42"/>
              <circle class="circle-fill" cx="50" cy="50" r="42"
                stroke="${item.color}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}"
                data-offset="${offset}"/>
            </svg>
            <div class="circle-text">${pct.toFixed(0)}%</div>
          </div>
          <div class="attendance-label">${item.label}</div>
          <div class="attendance-count">${formatNumber(item.count)} students</div>
        </div>
      `;
    }).join('');
  }

  function animateCircleProgress() {
    $$('.circle-fill').forEach(circle => {
      const target = circle.dataset.offset;
      if (target !== undefined) {
        setTimeout(() => {
          circle.style.strokeDashoffset = target;
        }, 200);
      }
    });
  }

  /* --------------------------------------------------------
     MODALS
     -------------------------------------------------------- */
  function initModals() {
    // Add Student modal
    const addModal = $('#addStudentModal');
    const openAddBtns = ['#addStudentBtn', '#qaAddStudent'];
    const closeAddBtns = ['#closeAddStudent', '#cancelAddStudent'];

    openAddBtns.forEach(sel => {
      const el = $(sel);
      if (el) el.addEventListener('click', () => addModal.classList.add('open'));
    });
    closeAddBtns.forEach(sel => {
      const el = $(sel);
      if (el) el.addEventListener('click', () => addModal.classList.remove('open'));
    });

    // Submit add student
    $('#submitAddStudent').addEventListener('click', (e) => {
      e.preventDefault();
      const firstName = $('#studentFirstName').value.trim();
      const lastName = $('#studentLastName').value.trim();
      const regId = $('#studentRegId').value.trim();
      const dept = $('#studentDept').value;
      const year = $('#studentYear').value;

      if (!firstName || !lastName || !regId || !dept || !year) {
        showToast('warning', 'Validation Error', 'Please fill in all fields.');
        return;
      }

      // Add to students array
      const colors = ['#36454F', '#3D4C3C', '#44366B', '#8C7355', '#A45A3C', '#6B2737', '#5B3A6B', '#2B3D4F'];
      const newStudent = {
        name: `${firstName} ${lastName}`,
        id: regId,
        department: dept,
        year: year,
        attendance: Math.floor(Math.random() * 20 + 75),
        performance: Math.floor(Math.random() * 20 + 72),
        status: 'Good',
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      // Set status based on performance
      if (newStudent.performance >= 88) newStudent.status = 'Excellent';
      else if (newStudent.performance < 76) newStudent.status = 'Needs Attention';

      students.push(newStudent);
      filterStudents(); // Re-render table

      addModal.classList.remove('open');
      $('#addStudentForm').reset();
      showToast('success', 'Student Added', `${newStudent.name} has been enrolled successfully.`);
    });

    // Report modal
    const reportModal = $('#reportModal');
    const openReportBtns = ['#btnGenerateReport', '#qaGenerateReport'];
    const closeReportBtns = ['#closeReport', '#cancelReport'];

    openReportBtns.forEach(sel => {
      const el = $(sel);
      if (el) el.addEventListener('click', () => reportModal.classList.add('open'));
    });
    closeReportBtns.forEach(sel => {
      const el = $(sel);
      if (el) el.addEventListener('click', () => reportModal.classList.remove('open'));
    });

    // Submit report
    $('#submitReport').addEventListener('click', (e) => {
      e.preventDefault();
      const type = $('#reportType').value;
      const format = $('#reportFormat').value;

      if (!type || !format) {
        showToast('warning', 'Validation Error', 'Please select report type and format.');
        return;
      }

      reportModal.classList.remove('open');
      $('#reportForm').reset();
      showToast('success', 'Report Generated', `${type} has been generated in ${format} format.`);
    });

    // Close modals on overlay click
    [addModal, reportModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        addModal.classList.remove('open');
        reportModal.classList.remove('open');
      }
    });
  }

  /* --------------------------------------------------------
     TOAST NOTIFICATIONS
     -------------------------------------------------------- */
  function showToast(type, title, message) {
    const container = $('#toastContainer');
    const icons = {
      success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      warning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon ${type}">${icons[type] || icons.info}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <div class="toast-progress" style="width:100%"></div>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Progress bar
    const progress = toast.querySelector('.toast-progress');
    const duration = 3500;
    progress.style.transitionDuration = duration + 'ms';
    setTimeout(() => { progress.style.width = '0%'; }, 50);

    // Remove after duration
    setTimeout(() => {
      toast.classList.add('hiding');
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  /* --------------------------------------------------------
     SCROLL REVEAL
     -------------------------------------------------------- */
  function initScrollReveal() {
    const reveals = $$('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------
     QUICK ACTIONS
     -------------------------------------------------------- */
  function initQuickActions() {
    $('#qaViewAttendance').addEventListener('click', () => {
      showToast('info', 'Attendance', 'Navigating to attendance overview…');
      // Scroll to attendance section
      const section = document.querySelector('[aria-label="Attendance overview"]');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('#qaExportData').addEventListener('click', () => {
      showToast('success', 'Export Started', 'Student data export has been initiated.');
    });

    // View Students button (hero)
    $('#btnViewStudents').addEventListener('click', () => {
      const section = document.querySelector('[aria-label="Student records"]');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* --------------------------------------------------------
     GLOBAL SEARCH
     -------------------------------------------------------- */
  function initGlobalSearch() {
    const input = $('#globalSearch');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          // Focus student search and fill
          $('#studentSearch').value = query;
          filterStudents();
          const section = document.querySelector('[aria-label="Student records"]');
          if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          showToast('info', 'Search', `Showing results for "${query}"`);
        }
      }
    });
  }

  /* --------------------------------------------------------
     CHART RESIZE HANDLER
     -------------------------------------------------------- */
  function initChartResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderEnrollmentChart, 250);
    });
  }

  /* --------------------------------------------------------
     STUDENT PROFILE DETAILS & EMAIL COPY
     -------------------------------------------------------- */
  function initStudentProfileToggle() {
    const btn = $('#btnShowDetails');
    const details = $('#studentDetails');
    const copyEmailBtn = $('#btnCopyEmail');

    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const emailEl = $('#studentEmail');
        const emailText = emailEl ? emailEl.textContent.trim() : 'cynthia.mca@university.edu';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(emailText).then(() => {
            showToast('success', 'Email Copied', `${emailText} copied to clipboard.`);
          }).catch(() => {
            showToast('info', 'Student Email', emailText);
          });
        } else {
          showToast('info', 'Student Email', emailText);
        }
      });
    }

    if (btn && details) {
      btn.addEventListener('click', () => {
        const isHidden = details.style.display === 'none' || details.style.display === '';
        if (isHidden) {
          details.style.display = 'grid';
          btn.textContent = 'Hide Details';
          showToast('info', 'Student Record', 'Displaying extended academic details.');
        } else {
          details.style.display = 'none';
          btn.textContent = 'Show Details';
        }
      });
    }
  }

  /* --------------------------------------------------------
     INITIALIZE EVERYTHING
     -------------------------------------------------------- */
  function init() {
    initDateAndGreeting();
    initSidebar();
    initDropdowns();
    initThemeToggle();
    renderDepartments();
    renderAttendanceCircles();
    initStudentTable();
    initModals();
    initQuickActions();
    initGlobalSearch();
    initStudentProfileToggle();
    initChartResize();

    // Loading screen kicks off the reveal chain
    initLoadingScreen();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
