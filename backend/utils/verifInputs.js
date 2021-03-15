module.exports = {
    validEmail: function (value) {
        const regexMail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
        return regexMail.test(value)
    },
    validPassword: function (value) {
        //8 caractères dont au minimum une majuscule, une minuscule, un caractère numérique et un caractère spécial
       
       const regexPassword = /\D/
        // const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/
        return regexPassword.test(value)
    },
    validUsername: function (value) {
        const pseudoRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        return pseudoRegex.test(value)
    }
}