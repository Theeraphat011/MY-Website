// เปิดใช้งานโหมด "strict mode" เพื่อช่วยตรวจสอบข้อผิดพลาดที่อาจเกิดขึ้น เช่น ตัวแปรที่ไม่ได้ประกาศ
"use strict";

// เลือกปุ่มที่มี attribute [data-theme-btn] เพื่อใช้สำหรับสลับธีม
const $themeBtn = document.querySelector("[data-theme-btn]");

// อ้างอิงถึงแท็ก <html> เพื่อเปลี่ยนค่า data-theme ของเอกสาร
const $HTML = document.documentElement;

// ตรวจสอบว่าผู้ใช้ตั้งค่าธีมของระบบเป็น "dark" หรือไม่, ถ้าใช่ isDark จะเป็น true, ถ้าไม่ isDark จะเป็น false
let isDark = window.matchMedia("(prefers-color-scheme)").matches;

// ตรวจสอบว่ามีการบันทึกธีมไว้ใน sessionStorage หรือไม่
if (sessionStorage.getItem("theme")) {
    // ถ้ามีค่าใน sessionStorage ให้นำค่าที่ได้มาใช้เป็นค่า data-theme
    $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
    // ถ้าไม่มีค่าใน sessionStorage ให้ใช้ธีมตามการตั้งค่าระบบ (isDark)
    $HTML.dataset.theme = isDark ? "dark" : "light";
    // บันทึกธีมปัจจุบันลงใน sessionStorage เพื่อให้จดจำได้ในครั้งถัดไป
    sessionStorage.setItem("theme", $HTML.dataset.theme);
};

// ฟังก์ชันสำหรับสลับธีม
const changeTheme = () => {
    // ถ้าธีมปัจจุบันคือ "light" ให้เปลี่ยนเป็น "dark", ถ้าธีมปัจจุบันคือ "dark" ให้เปลี่ยนเป็น "light"
    $HTML.dataset.theme = sessionStorage.getItem("theme") === "light" ? "dark" : "light";
     // บันทึกธีมใหม่ลงใน sessionStorage
    sessionStorage.setItem("theme", $HTML.dataset.theme);
};

// เมื่อคลิกปุ่ม จะเรียกใช้ฟังก์ชัน changeTheme เพื่อสลับธีม
$themeBtn.addEventListener("click", changeTheme);

const $tabBtn = document.querySelectorAll("[data-tab-btn]");
let lastActiveTab = document.querySelector("[data-tab-content]");
let lastActiveTabBtn = document.querySelector("[data-tab-btn]");

$tabBtn.forEach(item => {
    item.addEventListener("click", function () {

        lastActiveTab.classList.remove("active");
        lastActiveTabBtn.classList.remove("active");

        const $tabContent = document.querySelector(`[data-tab-content=${item.dataset.tabBtn}]`);
        $tabContent.classList.add("active");
        this.classList.add("active");

        lastActiveTab = $tabContent;
        lastActiveTabBtn = this;
    });
});