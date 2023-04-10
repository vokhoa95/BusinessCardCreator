package com.businesscardcreator;

import android.content.Intent;
import android.net.Uri;
import android.telephony.SmsManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SMSSenderModule extends ReactContextBaseJavaModule {

    public SMSSenderModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SMSSenderModule";
    }

    @ReactMethod
    public void sendSMS(String phoneNumber, String message) {
        Uri uri = Uri.parse("smsto:" + phoneNumber);
        Intent intent = new Intent(Intent.ACTION_SENDTO, uri);
        intent.putExtra("sms_body", message);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        ReactContext reactContext = getReactApplicationContext();
        reactContext.startActivity(intent);
    }
}
