import Joi from 'joi'
class UserSchema {
    public checkValidatidy (obj: object) {
        // eslint-disable-next-line no-useless-catch
        try {
            const schema: any = Joi.object({
                firstName: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
                lastName: Joi.string().alphanum().min(3).max(30).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                city: Joi.number().min(1).max(10).required(),
                gender: Joi.string().valid('m', 'f', 'o'),
                skills: Joi.string().valid('node', 'java', 'react', 'mongoDB', 'mysql')
            })
            const value = schema.validateAsync(obj)
            return value
        } catch (error) {
            throw error
        }
    }
}
const userSchema: UserSchema = new UserSchema()
export {
    userSchema
}
