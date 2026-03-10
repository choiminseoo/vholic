const calendarEl = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

/* ===== 게스트 데이터 (여기만 수정하면 됨) ===== */
const guestData = {
  "2026-3-13": { male: "1/3", female: "0/3" },
  "2026-3-15": { male: "0/3", female: "full" },
  "2026-3-20": { male: "0/3", female: "0/3" },
  "2026-3-22": { male: "0/3", female: "0/3" },
  "2026-3-27": { male: "0/3", female: "0/3" },
  "2026-3-29": { male: "0/3", female: "0/3" },
};

function renderCalendar(year, month) {
  calendarEl.innerHTML = "";
  monthTitle.textContent = `${year}.${month + 1}`;

  /* ===== 요일 헤더 ===== */
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const weekRow = document.createElement("div");
  weekRow.className = "calendar-week";

  days.forEach((day, index) => {
    const dayName = document.createElement("div");
    dayName.className = "week-day";
    dayName.textContent = day;

    if (index === 0) dayName.style.color = "#b2292b"; // 일요일
    if (index === 6) dayName.style.color = "#2049af"; // 토요일

    weekRow.appendChild(dayName);
  });

  calendarEl.appendChild(weekRow); // 🔥 요일 먼저 추가

  /* ===== 달력 그리드 ===== */
  const grid = document.createElement("div");
  grid.className = "calendar";

  const lastDate = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  /* 시작 요일 맞추기용 빈칸 */
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    grid.appendChild(empty);
  }

  /* 날짜 생성 */
  for (let d = 1; d <= lastDate; d++) {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";
  
    const dateKey = `${year}-${month + 1}-${d}`;
    const data = guestData[dateKey];
  
    /* 오늘 날짜 객체 */
    const cellDate = new Date(year, month, d);
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
  
    const isPast = cellDate < todayDate;
  
    /* 오늘 날짜 표시 */
    const isToday =
      year === today.getFullYear() &&
      month === today.getMonth() &&
      d === today.getDate();
  
    if (isToday) {
      dayEl.classList.add("today");
    }
  
    let statusHTML = "";
  
    /* 🔥 과거 날짜는 내용 안 보여줌 */
    if (data && !isPast) {
      if (data.text) {
        statusHTML = `<div class="status-note">${data.text}</div>`;
      } else if (data.male === "full" && data.female === "full") {
        statusHTML = `<div class="status-closed">마감</div>`;
      } else {
        if (data.male) {
          statusHTML += `<div class="status-male">
            ${data.male === "full" ? "마감" : data.male}
          </div>`;
        }
  
        if (data.female) {
          statusHTML += `<div class="status-female">
            ${data.female === "full" ? "마감" : data.female}
          </div>`;
        }
      }
    }
  
    dayEl.innerHTML = `
      <div class="date">${d}</div>
      ${statusHTML}
    `;
  
    grid.appendChild(dayEl);
  }

  calendarEl.appendChild(grid); // 🔥 날짜 그리드 추가
}

/* 이전 달 */
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

/* 다음 달 */
nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

renderCalendar(currentYear, currentMonth);
