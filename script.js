const activities = [
  {id:1,name:"Campus Clean-up Drive",category:"Environment",emoji:"🌱",date:"2026-11-08",location:"Central Campus",description:"Help keep shared campus spaces clean and welcoming for everyone.",hours:"2–3 hours"},
  {id:2,name:"Community Teaching Day",category:"Education",emoji:"📚",date:"2026-11-10",location:"Learning Centre",description:"Support school students with reading, homework and basic learning activities.",hours:"2 hours"},
  {id:3,name:"Annual Fest Volunteer",category:"Events",emoji:"🎪",date:"2026-11-14",location:"University Grounds",description:"Assist with event coordination, visitor guidance and activity management.",hours:"3–5 hours"},
  {id:4,name:"Food Donation Support",category:"Community",emoji:"🥫",date:"2026-11-17",location:"Community Kitchen",description:"Help sort, pack and distribute food donations to local families.",hours:"2 hours"},
  {id:5,name:"Tree Plantation Activity",category:"Environment",emoji:"🌳",date:"2026-11-20",location:"North Campus",description:"Plant and care for saplings as part of the campus green initiative.",hours:"2–3 hours"},
  {id:6,name:"Library Reading Buddy",category:"Education",emoji:"📖",date:"2026-11-22",location:"Central Library",description:"Spend time helping younger learners build confidence in reading.",hours:"1–2 hours"}
];

let submissions = JSON.parse(localStorage.getItem("campusCareSubmissions") || "[]");
let joined = JSON.parse(localStorage.getItem("campusCareJoined") || "[]");
const $ = id => document.getElementById(id);
const saveData = () => {
  localStorage.setItem("campusCareSubmissions", JSON.stringify(submissions));
  localStorage.setItem("campusCareJoined", JSON.stringify(joined));
};
const dateText = value => value ? new Date(value + "T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : "—";
const statusBadge = status => `<span class="status status-${status.toLowerCase()}">${status}</span>`;
const hoursTotal = status => submissions.filter(s=>!status || s.status===status).reduce((sum,s)=>sum+Number(s.hours),0);
const emptyRow = (cols,message) => `<tr><td colspan="${cols}" class="empty-row">${message}</td></tr>`;

function showView(view) {
  document.querySelectorAll(".page-view").forEach(p=>p.classList.toggle("active",p.id===view));
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  const names={dashboard:"Dashboard",activities:"Activities","my-hours":"My hours",submit:"Submit hours",organizer:"Organizer panel"};
  $("pageName").textContent=names[view] || "Dashboard";
  $("sidebar").classList.remove("open");
  renderAll();
}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.go)));
$("menuToggle").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
$("todayLabel").textContent=new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",year:"numeric"});

function renderActivities() {
  const search=($("activitySearch")?.value || "").toLowerCase();
  const category=$("categoryFilter")?.value || "All";
  const filtered=activities.filter(a=>(category==="All"||a.category===category) && (a.name.toLowerCase().includes(search)||a.description.toLowerCase().includes(search)));
  const markup=filtered.map(a=>`<article class="activity-card"><div class="activity-card-top"><div class="activity-emoji">${a.emoji}</div><span class="category-pill">${a.category}</span></div><h3>${a.name}</h3><p>${a.description}</p><div class="activity-meta"><span>▣ ${dateText(a.date)}</span><span>◷ ${a.hours}</span></div><button class="primary-btn" data-join="${a.id}" ${joined.includes(a.id)?"disabled":""}>${joined.includes(a.id)?"✓ Registered":"Register now →"}</button></article>`).join("");
  $("activitiesGrid").innerHTML=markup || `<div class="no-results">No activities match your search.</div>`;
  document.querySelectorAll("[data-join]").forEach(btn=>btn.addEventListener("click",()=>{const id=Number(btn.dataset.join);if(!joined.includes(id)){joined.push(id);saveData();renderAll();}}));
}
$("activitySearch").addEventListener("input",renderActivities);
$("categoryFilter").addEventListener("change",renderActivities);

function renderDashboard() {
  $("totalHours").textContent=hoursTotal();
  $("verifiedHours").textContent=hoursTotal("Approved");
  $("impactHours").textContent=hoursTotal("Approved");
  $("joinedCount").textContent=joined.length;
  $("pendingCount").textContent=submissions.filter(s=>s.status==="Pending").length;
  $("recommendedList").innerHTML=activities.slice(0,3).map(a=>`<div class="activity-row"><div class="activity-emoji">${a.emoji}</div><div class="activity-info"><strong>${a.name}</strong><small>${a.category} · ${dateText(a.date)}</small></div><button class="mini-action" data-go="activities">Explore</button></div>`).join("");
  $("recentTable").innerHTML=submissions.length ? [...submissions].reverse().slice(0,4).map(s=>`<tr><td>${s.activity}</td><td>${dateText(s.date)}</td><td>${s.hours} hrs</td><td>${statusBadge(s.status)}</td></tr>`).join("") : emptyRow(4,"No submissions yet. Submit your first volunteer hours!");
  $("recommendedList").querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showView("activities")));
}
function renderHistory() {
  $("historyVerified").textContent=hoursTotal("Approved");
  $("historyPending").textContent=hoursTotal("Pending");
  $("historyRejected").textContent=hoursTotal("Rejected");
  $("historyTable").innerHTML=submissions.length ? [...submissions].reverse().map(s=>`<tr><td>${s.activity}</td><td>${dateText(s.date)}</td><td>${s.hours} hrs</td><td>${statusBadge(s.status)}</td><td>${s.note || "—"}</td></tr>`).join("") : emptyRow(5,"No volunteer hours submitted yet.");
}
function renderOrganizer() {
  const pending=submissions.filter(s=>s.status==="Pending").length;
  $("organizerPending").textContent=pending;
  $("organizerApproved").textContent=submissions.filter(s=>s.status==="Approved").length;
  $("organizerTotal").textContent=submissions.length;
  $("organizerTable").innerHTML=submissions.length ? [...submissions].reverse().map(s=>`<tr><td>${s.student}</td><td>${s.activity}</td><td>${dateText(s.date)}</td><td>${s.hours} hrs</td><td>${statusBadge(s.status)}</td><td>${s.status==="Pending"?`<div class="action-group"><button class="approve-btn" data-approve="${s.id}">Approve</button><button class="reject-btn" data-reject="${s.id}">Reject</button></div>`:"—"}</td></tr>`).join("") : emptyRow(6,"There are no submissions to review.");
  document.querySelectorAll("[data-approve]").forEach(b=>b.addEventListener("click",()=>updateStatus(Number(b.dataset.approve),"Approved")));
  document.querySelectorAll("[data-reject]").forEach(b=>b.addEventListener("click",()=>updateStatus(Number(b.dataset.reject),"Rejected")));
}
function updateStatus(id,status) {
  const item=submissions.find(s=>s.id===id);
  if(item){item.status=status;item.note=status==="Approved"?"Hours verified by organizer.":"Submission was not approved. Please contact the organizer.";saveData();renderAll();}
}
function renderAll(){renderDashboard();renderActivities();renderHistory();renderOrganizer();}

activities.forEach(a=>{const option=document.createElement("option");option.value=a.name;option.textContent=a.name;$("activityName").appendChild(option);});
$("activityDate").max=new Date().toISOString().split("T")[0];
$("hoursForm").addEventListener("submit",event=>{
  event.preventDefault();
  const activity=$("activityName").value,date=$("activityDate").value,hours=Number($("hoursInput").value);
  if(!activity||!date||hours<0.5||hours>24){$("formMessage").textContent="Please enter valid activity details and hours.";return;}
  submissions.push({id:Date.now(),student:"Student User",activity,date,hours,description:$("description").value.trim(),organizer:$("organizerName").value.trim(),status:"Pending",note:"Awaiting organizer review."});
  saveData();event.target.reset();$("formMessage").textContent="Your hours have been submitted successfully and are pending verification.";renderAll();
});
renderAll();