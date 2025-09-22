import axios from "axios";
import { reactive } from "vue"

export default function () {
    let dogList = reactive([
        "https://images.dog.ceo/breeds/gaddi-indian/Gaddi.jpg"
    ])

    async function getDog() {
        try {
            let result = await axios.get("https://dog.ceo/api/breeds/image/random")
            if (result.status == 200) {
                dogList.push(result.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    return { dogList, getDog }
}