const calendarEl = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

/* ===== 게스트 데이터 (여기만 수정하면 됨) ===== */
const guestData = {
  "2026-2-20": { male: "full", female: "full" },
  "2026-2-22": { male: "0/3", female: "0/3" },
  "2026-2-27": { male: "0/3", female: "0/3" },
  "2026-3-6": { male: "0/3", female: "1/3" }
};

function renderCalendar(year, month) {
  calendarEl.innerHTML = "";
  monthTitle.textContent = `${year}.${month + 1}`;

  const grid = document.createElement("div");
  grid.className = "calendar";

  const lastDate = new Date(year, month + 1, 0).getDate();
  // 오늘 날짜 표시
  const today = new Date();

  for (let d = 1; d <= lastDate; d++) {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";

    const dateKey = `${year}-${month + 1}-${d}`;
    const data = guestData[dateKey];

    const isToday = 
    year === today.getFullYear() &&
    month === today.getMonth() &&
    d === today.getDate();

  if (isToday) {
    dayEl.classList.add("today");
  }

    let statusHTML = "";

    if (data) {
      if (data.male === "full" && data.female === "full") {
        statusHTML = `<div class="status-closed">마감</div>`;
      } else {
        if (data.male === "full") {
          statusHTML += `<div class="status-male">마감</div>`;
        } else {
          statusHTML += `<div class="status-male">${data.male}</div>`;
        }

        if (data.female === "full") {
          statusHTML += `<div class="status-female">마감</div>`;
        } else {
          statusHTML += `<div class="status-female">${data.female}</div>`;
        }
      }
    }

    dayEl.innerHTML = `
      <div class="date">${d}</div>
      ${statusHTML}
    `;

    grid.appendChild(dayEl);
  }

  calendarEl.appendChild(grid);
}

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

renderCalendar(currentYear, currentMonth);
