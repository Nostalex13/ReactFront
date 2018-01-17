using System;
using System.Net.Mail;

namespace CampusManager.Helpers
{
    public class EmailManager : IDisposable
    {
        private MailAddress _from;
        private SmtpClient _smtp;
        public EmailManager()
        {
            _from = new MailAddress("cmanager@cmanager.com");
            _smtp = new SmtpClient
            {
                UseDefaultCredentials = true,
                EnableSsl = true
            };
        }

        public bool SendEmailWithRenew(string email, string password)
        {
            try
            {
                MailAddress to = new MailAddress(email);
                MailMessage message = new MailMessage(_from, to)
                {
                    Subject = "Renew password",
                    Body = "<h2>Your new password is:</h2>" + password,
                    IsBodyHtml = true
                };
                _smtp.Send(message);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool SendEmailWithRegistration(string email, string password)
        {
            try
            {
                MailAddress to = new MailAddress(email);
                MailMessage message = new MailMessage(_from, to)
                {
                    Subject = "Registation",
                    Body = "<h2>You email is: </h2>" + email + "\n<h2>Your password is: </h2>" + password,
                    IsBodyHtml = true
                };
                _smtp.Send(message);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Dispose()
        {
            _smtp?.Dispose();
            _smtp = null;
            _from = null;
        }
    }
}
