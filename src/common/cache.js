import localForage from "localforage";


export function loadFavorite() {
  
    return localForage.getItem('favorite')
}
export function setFavorite(array) {
  localForage.setItem('favorite',array).catch( err => {
    console.log(err)
  })
}
