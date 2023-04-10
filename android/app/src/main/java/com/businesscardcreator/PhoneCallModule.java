package com.businesscardcreator;

import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PhoneCallModule extends ReactContextBaseJavaModule {

    public PhoneCallModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PhoneCallModule";
    }

    @ReactMethod
    public void makePhoneCall(String phoneNumber) {
        Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + phoneNumber));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        if (intent.resolveActivity(getReactApplicationContext().getPackageManager()) != null) {
            getReactApplicationContext().startActivity(intent);
        }
    }
}
