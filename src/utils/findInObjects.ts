export function findInObjects(arr: any[], search: string, limitByKey: string) {
  return arr.filter(function(obj) {
    return Object.keys(obj).some(function(key) {
      if (limitByKey) {
        return String(obj[limitByKey]).toLowerCase().includes(search.toLowerCase());
      }
      return String(obj[key]).toLowerCase().includes(search.toLowerCase());
    })
  });
}
