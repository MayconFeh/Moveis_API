import validateAdmin from "./validateAdmin.middlewares";
import validateBody from "./validateBody.middlewares";
import validateCategoryId from "./validateCategoryId.middlewares";
import validateDate from "./validateDate.middlewares";
import validateEmail from "./validateEmail.middlewares";
import validateRealEstates from "./validateRealEstates.middlewares";
import validateToken from "./validateToken.middlewares";
import validateUserId from "./validateUserId.middlewares";
import validateUserPermission from "./validateUserPermission.middlewares";


export default {
  validateAdmin,
  validateBody,
  validateCategoryId,
  validateDate,
  validateEmail,
  validateRealEstates,
  validateToken,
  validateUserPermission,
  validateUserId,
};
