"use strict";

const diaryDate = document.querySelector(".diary-date");
const diaryTitle = document.getElementById("diary-title");
const diaryContent = document.getElementById("diary-content");
const saveBtn = document.querySelector(".black-btn");

let diaries = JSON.parse(localStorage.getItem("diary-list"));

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

diaryDate.textContent = `${year}.${("00" + month.toString()).slice(-2)}.${(
  "00" + date.toString()
).slice(-2)}의 비밀일기`;

function showDiary() {
  const diaryLists = document.querySelector(".diary-lists");
  diaryLists.innerHTML = "";
  if (diaries) {
    for (let i = diaries.length - 1; i >= 0; i--) {
      const diaryList = document.createElement("li");
      const diaryArticle = document.createElement("article");
      const articleTitle = document.createElement("h3");
      const articleContent = document.createElement("p");
      const articleTime = document.createElement("time");
      const btnGroup = document.createElement("div");
      const editDiaryBtn = document.createElement("button");
      const editImg = document.createElement("img");
      const deleteDiaryBtn = document.createElement("button");
      const deleteImg = document.createElement("img");
      const span = document.createElement("span");

      diaryArticle.setAttribute("class", "diary-article");
      articleTitle.setAttribute("class", "article-title");
      articleContent.setAttribute("class", "article-content");
      articleTime.setAttribute("class", "article-time");
      articleTime.setAttribute("datetime", diaries[i].date);
      btnGroup.setAttribute("class", "button-group");

      articleTitle.textContent = diaries[i].title;
      articleTime.textContent = diaries[i].date;
      articleContent.textContent = diaries[i].content;

      editDiaryBtn.setAttribute("type", "button");
      editDiaryBtn.setAttribute(
        "onclick",
        `editDiary(${i}, "${diaries[i].title}", "${diaries[i].content}")`
      );
      editImg.src = "./img/icon-edit.svg";
      editImg.alt = "수정하기";

      deleteDiaryBtn.setAttribute("type", "button");
      deleteDiaryBtn.setAttribute(
        "onclick",
        `deleteDiary(${i}, "${diaries[i].title}")`
      );
      deleteImg.src = "./img/icon-delete.svg";
      deleteImg.alt = "삭제하기";

      diaryLists.append(diaryList);
      diaryList.append(diaryArticle);
      diaryArticle.append(articleTitle);
      diaryArticle.append(articleTime);
      diaryArticle.append(articleContent);
      diaryArticle.append(btnGroup);
      btnGroup.append(editDiaryBtn);
      btnGroup.append(span);
      btnGroup.append(deleteDiaryBtn);
      editDiaryBtn.append(editImg);
      deleteDiaryBtn.append(deleteImg);
    }
  }
}
showDiary();

let editId;
let isEditedDiary = false;
function editDiary(memoId, title, content) {
  editId = memoId;
  isEditedDiary = true;
  diaryTitle.value = title;
  diaryContent.value = content;
  diaryTitle.focus();
  saveBtn.textContent = "수정하기";
}

function deleteDiary(deleteId, title) {
  let res = confirm(`정말 "${title}" 다이어리를 삭제하시겠습니까?`);
  if (res) {
    diaries.splice(deleteId, 1);
    isEditedDiary = false;
    diaryTitle.value = "";
    diaryContent.value = "";
    saveBtn.textContent = "작성하기";
    localStorage.setItem("diary-list", JSON.stringify(diaries));
    showDiary();
  }
}

saveBtn.addEventListener("click", () => {
  let userTitle = diaryTitle.value.trim();
  let userContent = diaryContent.value;
  let writeDate = new Date()
    .toLocaleString()
    .substring(0, today.toLocaleString().length - 3);
  let diaryInfo;

  if (userTitle) {
    if (!isEditedDiary) {
      if (!diaries) {
        diaries = [];
      }
      diaryInfo = { title: userTitle, content: userContent, date: writeDate };
      diaries.push(diaryInfo);
    } else {
      alert("수정되었습니다.");
      isEditedDiary = false;
      saveBtn.textContent = "작성하기";
      diaries[editId].title = userTitle;
      diaries[editId].content = userContent;
    }
    diaryTitle.value = "";
    diaryContent.value = "";
  } else {
    diaryTitle.focus();
  }

  localStorage.setItem("diary-list", JSON.stringify(diaries));
  showDiary();
});
