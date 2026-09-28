document.addEventListener('DOMContentLoaded', function () {
  function initShowMore(listId, toggleId, itemClass, extraClass) {
    var list = document.getElementById(listId);
    var toggleBtn = document.getElementById(toggleId);
    if (!list || !toggleBtn) return;
    var totalCount = list.querySelectorAll('.' + itemClass).length;
    var extraCount = list.querySelectorAll('.' + itemClass + '.' + extraClass).length;
    toggleBtn.textContent = 'Show all ' + totalCount;
    toggleBtn.addEventListener('click', function () {
      var showingAll = list.classList.toggle('show-all');
      toggleBtn.textContent = showingAll ? 'Show fewer' : 'Show all ' + totalCount;
    });
    if (extraCount === 0) {
      toggleBtn.style.display = 'none';
    }
  }

  initShowMore('pubs-list', 'pubs-toggle', 'pub-item', 'pub-extra');
  initShowMore('media-list', 'media-toggle', 'media-item', 'media-extra');

  var emailBtn = document.getElementById('email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      window.location.href = 'mailto:' + 'sean.manning' + '@' + 'nuphase.tech';
    });
  }
});
