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

export const getToken = () => {
    const token = JSON.parse(localStorage.getItem('user'));
    const jwt = token?.jwt
    return jwt 
}

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userProfile = user.user
    return userProfile
}

export const getCurrentUser = async () => {
    const token = getToken();
  
    const response = await fetch('http://localhost:1337/api/users/me', {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
  
    const data = await response.json();
    return data;
  };