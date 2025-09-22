import server from "@renderer/utils/request";

export const login = (data: object) => {
    return server({
        url: '/login',
        method: 'post',
        data
    })
}