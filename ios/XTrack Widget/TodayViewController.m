//
//  TodayViewController.m
//  XTrack Widget
//
//  Created by Miro on 11/11/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//
#import "TodayViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <NotificationCenter/NotificationCenter.h>
#import "DisplayMode.h"
#import "Linking.h"
DisplayMode* displayMode;
Linking* linking;

@interface TodayViewController () <NCWidgetProviding>

@end

@implementation TodayViewController

- (void)loadView {
  
  NSURL *jsCodeLocation;
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.widget" fallbackResource:nil];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Xtrack Widget"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1 green:1 blue:1 alpha:0];
  self.view = rootView;
  displayMode = [[DisplayMode alloc]initWithContext:self.extensionContext];
  linking = [[Linking alloc]initWithContext:self.extensionContext];
}

- (void)widgetActiveDisplayModeDidChange:(NCWidgetDisplayMode)activeDisplayMode withMaximumSize:(CGSize)maxSize{
  if (activeDisplayMode == NCWidgetDisplayModeCompact){
    self.preferredContentSize = maxSize;
  }
  else if (activeDisplayMode == NCWidgetDisplayModeExpanded){
    self.preferredContentSize = CGSizeMake(maxSize.width, [DisplayMode getMaxHeight]);
  }
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    [self setPreferredContentSize:CGSizeMake(0, 200)];
    
}


- (void)widgetPerformUpdateWithCompletionHandler:(void (^)(NCUpdateResult))completionHandler {
    // Perform any setup necessary in order to update the view.
    
    // If an error is encountered, use NCUpdateResultFailed
    // If there's no update required, use NCUpdateResultNoData
    // If there's an update, use NCUpdateResultNewData

    completionHandler(NCUpdateResultNewData);
}

@end
