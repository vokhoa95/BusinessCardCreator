import Foundation
import MessageUI

@objc(SMSSenderModule)
class SMSSenderModule: NSObject {

  @objc(sendSMS:withMessage:resolver:rejecter:)
  func sendSMS(phoneNumber: String, message: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    if (MFMessageComposeViewController.canSendText()) {
      let messageComposeVC = MFMessageComposeViewController()
      messageComposeVC.recipients = [phoneNumber]
      messageComposeVC.body = message
      messageComposeVC.messageComposeDelegate = self as? MFMessageComposeViewControllerDelegate
      UIApplication.shared.keyWindow?.rootViewController?.present(messageComposeVC, animated: true, completion: nil)
      resolve("SMS sent successfully!")
    } else {
      reject("error", "SMS is not supported on this device", nil)
    }
  }
}

extension SMSSenderModule: MFMessageComposeViewControllerDelegate {
  func messageComposeViewController(_ controller: MFMessageComposeViewController, didFinishWith result: MessageComposeResult) {
    controller.dismiss(animated: true, completion: nil)
  }
}
