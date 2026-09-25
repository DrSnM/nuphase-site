document.addEventListener('DOMContentLoaded', function () {
  var pubsList = document.getElementById('pubs-list');
  var toggleBtn = document.getElementById('pubs-toggle');
  if (pubsList && toggleBtn) {
    var totalCount = pubsList.querySelectorAll('.pub-item').length;
    var extraCount = pubsList.querySelectorAll('.pub-item.pub-extra').length;
    toggleBtn.textContent = 'Show all ' + totalCount;
    toggleBtn.addEventListener('click', function () {
      var showingAll = pubsList.classList.toggle('show-all');
      toggleBtn.textContent = showingAll ? 'Show fewer' : 'Show all ' + totalCount;
    });
    if (extraCount === 0) {
      toggleBtn.style.display = 'none';
    }
  }

  var emailBtn = document.getElementById('email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      window.location.href = 'mailto:' + 'sean.manning' + '@' + 'nuphase.tech';
    });
  }
});
