export const checkIfImage = (url: string, callback: any) => {
    const img = new Image()
    img.src = url
    if (img.complete) callback(true)
    img.onload = () => callback(true)
    img.onerror = () => callback(false)
}