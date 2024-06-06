import React from 'react';

const LoginWithPhone = () => {
  return (
    <main className="main">
      <section className="section mt-30">
        <div className="container">
        <div className="col-lg-6 order-1 px-3">
                <div className="box-info-banner-shop-list">
                  <h2 className="color-gray-800 mb-20">Sign in with Phone</h2>
                  <p className="mb-30 font-lg color-grey-500">To access your account</p>
                  <div className="d-flex">
                    <form className="custom-form mb-3">
                      <div className="form-group my-1 btn-otp d-flex justify-content-center">
                        <div className="pe_signin_button" data-client-id="11712460276332778881">
                          <script
                            src="https://www.phone.email/sign_in_button_v1.js"
                            async
                          ></script>
                        </div>
                        <script>
                          {`function phoneEmailListener(userObj) {
                            var user_json_url = userObj.user_json_url;
                            var user_country_code = userObj.user_country_code;
                            var user_phone_number = userObj.user_phone_number;
                            alert('SUCCESS !!\\nYour phone number ' + user_country_code + ' ' + user_phone_number + ' has been authenticated.');
                            // You can submit your form here or redirect user to post login dashboard page
                            // Send user_json_url to your backend to retrieve user info (i.e. country code and phone number) from this URL.
                          }`}
                        </script>
                      </div>
                    </form>
                  </div>

                
                </div>
              </div>
        </div>
      </section>
    </main>
  );
};

export default LoginWithPhone;
