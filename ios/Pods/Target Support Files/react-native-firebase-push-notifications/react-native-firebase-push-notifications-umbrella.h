#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "FirebasePushNotifications.h"
#import "RCTConvert+UIBackgroundFetchResult.h"
#import "RNFirebase.h"
#import "RNFirebaseEvents.h"
#import "RNFirebaseMessaging.h"
#import "RNFirebaseUtil.h"

FOUNDATION_EXPORT double react_native_firebase_push_notificationsVersionNumber;
FOUNDATION_EXPORT const unsigned char react_native_firebase_push_notificationsVersionString[];

