const getWishlistItems = () => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}
const setWishlistItems = (wishlistItems) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
}
export {getWishlistItems, setWishlistItems}