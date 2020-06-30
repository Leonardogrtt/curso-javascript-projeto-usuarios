class Utils {

    //método estático da classe 'Utils', que não necessita da instanciação do objeto
    static dateFormat(date){

        return date.getDate() + '/' + (date.getMonth()+1) + '/' + (date.getFullYear()) + ' ' + date.getHours() + ':' + date.getMinutes();

    }

}