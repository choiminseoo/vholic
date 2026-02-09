const calendarEl = document.getElementById("calendar");
const monthTitleEl = document.getElementById("monthTitle");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

// 네가 관리할 상태
const guestStatus = {
  "2026-02-13": "open",
  "2026-02-15": "open",
  "2026-02-20": "open",
  "2026-02-22": "open",
  "2026-02-27": "open",

};

let currentDate = new Date();

function renderCalendar(year, month) {
  calendarEl.innerHTML = "";

  monthTitleEl.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay();

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  days.forEach(d => {
    const head = document.createElement("div");
    head.className = "day head";
    head.textContent = d;
    grid.appendChild(head);
  });

  for (let i = 0; i < startDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let date = 1; date <= lastDate; date++) {
    const day = document.createElement("div");
    day.className = "day";

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    const label = document.createElement("span");
    label.className = "date";
    label.textContent = date;

    day.appendChild(label);

    if (guestStatus[dateStr]) {
      const status = document.createElement("span");
      status.className = `status ${guestStatus[dateStr]}`;
      status.textContent =
        guestStatus[dateStr] === "open" ? "모집중" : "마감";
      day.appendChild(status);
      day.classList.add(guestStatus[dateStr]);
    }

    grid.appendChild(day);
  }

  calendarEl.appendChild(grid);
}

// 버튼 이벤트
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// 최초 실행
renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
