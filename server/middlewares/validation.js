class Validation{
    static validateId(req, res, next) {
        const { id } = req.params;
        
        if (id.toString().replace(/\s/g, '').length === 0) {
          return res.status(400).json({
            status: 400,
            error: 'Id must be provided',
          });
        }
        next();
    }
}

export default Validation;