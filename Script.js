
"use strict";

const schedules = {
  Senin: [
    {
      time: "12.30–14.10",
      subject: "Pengantar Akuntansi dan Keuangan",
      lecturer: "Novilia",
      room: "G.107A"
    },
    {
      time: "14.10–15.50",
      subject: "Sistem Informasi Pariwisata",
      lecturer: "Moh. Edi Saputro",
      room: "LPC"
    }
  ],

  Selasa: [
    {
      time: "09.10–11.00",
      subject: "Manajemen Sumber Daya Manusia",
      lecturer: "Dani Agung",
      room: "G.208"
    },
    {
      time: "11.00–12.30",
      subject: "Bahasa Inggris dan Praktikum Bahasa Inggris",
      lecturer: "Eka",
      room: "G.107"
    }
  ],

  Rabu: [
    {
      time: "10.00–11.40",
      subject: "Agama",
      lecturer: "Imam Wahyono",
      room: "G.201"
    },
    {
      time: "12.30–14.10",
      subject: "Bahasa Indonesia",
      lecturer: "Beby",
      room: "G.206"
    }
  ],

  Kamis: [
    {
      time: "07.30–09.10",
      subject: "Pancasila",
      lecturer: "Ninik",
      room: "G.201"
    },
    {
      time: "12.30–14.10",
      subject: "Kewarganegaraan",
      lecturer: "Widhi Harsono",
      room: "G.601"
    },
    {
      time: "14.10–15.50",
      subject: "Pemahaman Lintas Budaya",
      lecturer: "Wira",
      room: "G.601"
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".day-tab");
  const classList = document.getElementById("classList");
  const selectedDay = document.getElementById("selectedDay");
  const courseCount = document.getElementById("courseCount");
  const details = document.getElementById("courseDetails");

  if (!tabs.length || !classList || !selectedDay ||
      !courseCount || !details) {
    console.error(
      "Elemen jadwal tidak ditemukan. Periksa index.html."
    );
    return;
  }

  let currentDay = "Senin";
  let selectedCourseIndex = null;

  function renderSchedule(day) {
    currentDay = day;
    selectedCourseIndex = null;

    const courses = schedules[day];

    if (!courses) {
      classList.textContent = "Jadwal belum tersedia.";
      return;
    }

    selectedDay.textContent = day;
    courseCount.textContent =
      `${courses.length} mata kuliah`;

    tabs.forEach(tab => {
      const isActive = tab.dataset.day === day;

      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });

    classList.replaceChildren();

    courses.forEach((course, index) => {
      const card = document.createElement("button");

      card.type = "button";
      card.className = "class-card";
      card.setAttribute(
        "aria-label",
        `Lihat detail ${course.subject}`
      );

      card.innerHTML = `
        <span class="class-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="class-info">
          <span class="class-time">${course.time}</span>
          <h4>${course.subject}</h4>
          <p>Dosen: ${course.lecturer}</p>
          <p>Ruangan: ${course.room}</p>
          <span class="card-action">Lihat detail →</span>
        </span>
      `;

      card.addEventListener("click", () => {
        selectedCourseIndex = index;

        document.querySelectorAll(".class-card").forEach(item => {
          item.classList.remove("selected");
        });

        card.classList.add("selected");
        renderDetails(course, day);
      });

      classList.appendChild(card);
    });

    showPlaceholder();
  }

  function showPlaceholder() {
    details.innerHTML = `
      <div class="detail-placeholder">
        <div class="detail-icon">✳</div>
        <span class="eyebrow">COURSE INFORMATION</span>
        <h3>Pilih Mata Kuliah</h3>
        <p>
          Pilih salah satu mata kuliah di sebelah kiri
          untuk melihat jadwal, dosen pengampu, dan
          ruangan perkuliahan.
        </p>
      </div>
    `;
  }

  function renderDetails(course, day) {
    details.innerHTML = `
      <div class="detail-top">
        <span class="eyebrow">COURSE INFORMATION</span>
        <h3>${course.subject}</h3>
        <p>Jadwal perkuliahan DEP 1B</p>
      </div>

      <div class="detail-body">
        <div class="detail-row">
          <span class="detail-symbol">▦</span>
          <div>
            <small>Hari Perkuliahan</small>
            <strong>${day}</strong>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-symbol">◷</span>
          <div>
            <small>Waktu Kuliah</small>
            <strong>${course.time}</strong>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-symbol">♙</span>
          <div>
            <small>Dosen Pengampu</small>
            <strong>${course.lecturer}</strong>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-symbol">⌂</span>
          <div>
            <small>Ruangan</small>
            <strong>${course.room}</strong>
          </div>
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      renderSchedule(tab.dataset.day);
    });
  });

  renderSchedule(currentDay);
});
