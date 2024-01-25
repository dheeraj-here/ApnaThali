/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Document({ color, size }) {
  return (
<svg fill="#000000" viewBox="-5.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.987 5.653a4.536 4.536 0 0 1-.149 1.213 4.276 4.276 0 0 1-.389.958 5.186 5.186 0 0 1-.533.773c-.195.233-.386.454-.568.658l-.024.026c-.17.18-.328.353-.468.516a3.596 3.596 0 0 0-.4.567 2.832 2.832 0 0 0-.274.677 3.374 3.374 0 0 0-.099.858v.05a1.03 1.03 0 0 1-2.058 0v-.05a5.427 5.427 0 0 1 .167-1.385 4.92 4.92 0 0 1 .474-1.17 5.714 5.714 0 0 1 .63-.89c.158-.184.335-.38.525-.579.166-.187.34-.39.52-.603a3.108 3.108 0 0 0 .319-.464 2.236 2.236 0 0 0 .196-.495 2.466 2.466 0 0 0 .073-.66 1.891 1.891 0 0 0-.147-.762 1.944 1.944 0 0 0-.416-.633 1.917 1.917 0 0 0-.62-.418 1.758 1.758 0 0 0-.723-.144 1.823 1.823 0 0 0-.746.146 1.961 1.961 0 0 0-1.06 1.062 1.833 1.833 0 0 0-.146.747v.028a1.03 1.03 0 1 1-2.058 0v-.028a3.882 3.882 0 0 1 .314-1.56 4.017 4.017 0 0 1 2.135-2.139 3.866 3.866 0 0 1 1.561-.314 3.792 3.792 0 0 1 1.543.314A3.975 3.975 0 0 1 7.678 4.09a3.933 3.933 0 0 1 .31 1.563zm-2.738 9.81a1.337 1.337 0 0 1 0 1.033 1.338 1.338 0 0 1-.71.71l-.005.003a1.278 1.278 0 0 1-.505.103 1.338 1.338 0 0 1-1.244-.816 1.313 1.313 0 0 1 .284-1.451 1.396 1.396 0 0 1 .434-.283 1.346 1.346 0 0 1 .526-.105 1.284 1.284 0 0 1 .505.103l.005.003a1.404 1.404 0 0 1 .425.281 1.28 1.28 0 0 1 .285.418z"></path></g></svg>
);
}

// Setting default values for the props of Document
Document.defaultProps = {
  color: "dark",
  size: "12px",
};

// Typechecking props for the Document
Document.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Document;
