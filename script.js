// غيّر true إلى false عند إغلاق الدعم.
const supportOpen = true;
if(!supportOpen){document.getElementById('supportTitle').textContent='الدعم مغلق';document.getElementById('supportText').textContent='فريق الدعم غير متواجد حالياً. يرجى المحاولة خلال أوقات الدعم.';document.getElementById('mini').textContent='مغلق';document.querySelector('.pulse').style.background='#ff7777'}
