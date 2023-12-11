/**
 * Display validation errors returned from the REST API
 * For 'Sign Up', 'Create Course', and 'Update Course' screens
 * 
 * @param {object} errors
 * @returns The validation error messages component
 */

const ErrorsDisplay = ({ errors }) => {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
    );
    return errorsDisplay;
  }
};

export default ErrorsDisplay;
