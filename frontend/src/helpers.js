export const storeUser = (data) => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            user: data.user,
            jwt: data.jwt,
        })
    )
}

export const userData = () => {
    const stringifiedUser = localStorage.getItem('user') || '""';
    return JSON.parse(stringifiedUser || {})
}