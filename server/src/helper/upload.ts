import path from 'path'
import os from 'os'

class UploadedOnLocal {
    public async uploadFile (file: any): Promise<string> {
        try {
            const profilePic = file.profilePic
            const userInfo = os.userInfo()
            const uid = userInfo.uid
            const fileName = `${uid}${Date.now()}${path.extname(profilePic.name)}`
            const uploadPath: string = path.join(`${path.resolve(path.dirname(__filename), '../')}/upload`, fileName)

            // Use the mv() method to place the file somewhere on your server
            profilePic.mv(uploadPath, function (err: unknown) {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (err) {
                    // eslint-disable-next-line @typescript-eslint/no-throw-literal
                    throw err
                }
                console.log('file uploaded successfully')
            })
            return fileName
        } catch (error: unknown) {
            console.log('ERROR: ', error)
            throw error
        }
    }
}

export = UploadedOnLocal
