const errormiddleware = async (req, res ,next) => {

    console.log(error);
     const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Server Error"
    });
    
}

module.exports=errormiddleware;