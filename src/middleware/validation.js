
// export const validation = (schema) => {
//   return (req, res, next) => {
//     const bodyResult = schema.body?.validate(req.body, { abortEarly: false });
//     const paramsResult = schema.params?.validate(req.params, { abortEarly: false });

//     const errors = [];

//     if (bodyResult?.error) {
//       errors.push(
//         ...bodyResult.error.details.map((err) => ({
//           type: "body",
//           message: err.message,
//           path: err.path.join('.'),
//         }))
//       );
//     }

//     if (paramsResult?.error) {
//       errors.push(
//         ...paramsResult.error.details.map((err) => ({
//           type: "params",
//           message: err.message,
//           path: err.path.join('.'),
//         }))
//       );
//     }

//     if (errors.length > 0) {
//       return res.status(400).json({
//         message: "Validation failed",
//         errors,
//       });
//     }

//     next();
//   };
// };
const datamethods = ['body', 'paramas', 'query', 'headers', 'file']

export const validation = (joiSchema) => {
  return (req, res, next) => {


    const validationerr = []

    datamethods.forEach(key => {
      if(joiSchema[key]) {
        const validationresult = joiSchema[key].validate(req[key], {abortearly: false})
        if(validationresult.error){
          validationerr.push(validationresult.error.details)
        }
      }
    });
    if(validationerr.length > 0){
      return res.json({message: "validation error", validationerr})
    }
    return next()
  }
}