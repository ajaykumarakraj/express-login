import bcryct from "bcrypt"
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcryct.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
};
export const comparePassword = async (password, hashedPassword) => {
    return bcryct.compare(password, hashedPassword)
}
export default hashPassword