//
//  UIImageView+Animation.m
//  WTTFramework
//
//  Created by guguniao on 2020/9/10.
//

#import "UIImageView+Animation.h"
#import <objc/runtime.h>


@implementation UIImageView (Animation)

+ (void)load {
    static dispatch_once_t onceTokena;
    dispatch_once(&onceTokena, ^{
        Class targetClass = [self class];
        SEL originalSelector = @selector(setImage:);
        SEL swizzledSelector = @selector(setImage_c:);
        swizzleMethod_uiimage(targetClass, originalSelector, swizzledSelector);
    });
}

void swizzleMethod_uiimage(Class class, SEL originalSelector, SEL swizzledSelector) {
    Method originalMethod = class_getInstanceMethod(class, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
    
    IMP swizzledImp = method_getImplementation(swizzledMethod);
    char *swizzledTypes = (char *)method_getTypeEncoding(swizzledMethod);
    
    IMP originalImp = method_getImplementation(originalMethod);
    
    char *originalTypes = (char *)method_getTypeEncoding(originalMethod);
    BOOL success = class_addMethod(class, originalSelector, swizzledImp, swizzledTypes);
    if (success) {
        class_replaceMethod(class, swizzledSelector, originalImp, originalTypes);
    }else {
        // 添加失败，表明已经有这个方法，直接交换
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
}

-(void)setImage_c:(UIImage *)image{
//  NSLog(@"superview===%ld",self.superview.tag);
  if(self.tag==888){

    [self setImage_c:image];
    
  }
  else{
    CATransition *transition = [CATransition animation];
    transition.duration = 0.3;
    transition.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    transition.type = kCATransitionFade;
      [self.layer addAnimation:transition forKey:@"a"];
    [self setImage_c:image];
  }
  
}
@end
