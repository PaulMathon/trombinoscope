export function fetchPractitioners() {
  return fetch("https://script.google.com/macros/s/AKfycbywa_fzotVjoX96bdDzstaYtqUOlt-SML8hId919FqEl63mIoPUH9g1/exec")
    .then((result) => result.json());
}
