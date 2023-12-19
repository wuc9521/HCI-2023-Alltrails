#coding=utf-8
try:
    from selenium import webdriver
    import undetected_chromedriver as uc
    from selenium.webdriver.common.by import By
    from fake_useragent import UserAgent
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.chrome.service import Service
    import time
    import os
    print('all module are loaded ')
except Exception as e:
    print("Error ->>>: {} ".format(e))


class Spoofer(object):
    def __init__(self, country_id=['US'], rand=True, anonym=True):
        self.country_id = country_id
        self.rand = rand
        self.anonym = anonym
        self.userAgent = UserAgent().random


class DriverOptions(object):
    def __init__(self):
        self.options = Options()
        self.options.add_argument('--no-sandbox')
        self.options.add_argument('--start-maximized')
        self.options.add_argument('--single-process')
        self.options.add_argument('--disable-dev-shm-usage')
        self.options.add_argument("--incognito")
        self.options.add_argument('--disable-blink-features=AutomationControlled')
        self.options.add_argument('--disable-blink-features=AutomationControlled')
        self.options.add_experimental_option('useAutomationExtension', False)
        self.options.add_experimental_option("excludeSwitches", ["enable-automation"])
        self.options.add_argument("disable-infobars")
        # self.options.add_argument('--headless')
        self.options.add_argument('--enable-javascript')
        self.options.add_argument('--disable-extensions')
        self.options.add_argument('--disable-default-apps')
        self.helperSpoofer = Spoofer()
        self.options.add_argument('user-agent={}'.format(self.helperSpoofer.userAgent))


class WebDriver(DriverOptions):
    def __init__(self, path=''):
        DriverOptions.__init__(self)
        self.driver_instance = self.get_driver()

    def get_driver(self):
        print("""UserAgent: {}""".format(self.helperSpoofer.userAgent))
        webdriver.DesiredCapabilities.CHROME['acceptSslCerts'] = True
        path = os.path.join(os.getcwd(), 'chromedriver')
        service = Service(executable_path=path)
        driver = webdriver.Chrome(service=service, options=self.options)
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
            "source":
                "const newProto = navigator.__proto__;"
                "delete newProto.webdriver;"
                "navigator.__proto__ = newProto;"
        })
        return driver
    
def main():
    driver= WebDriver()
    driverinstance = driver.driver_instance
    driverinstance.get("https://www.alltrails.com/china/jiangsu/nanjing")
    iframe_switch = driverinstance.find_element(By.XPATH, "/html/body/iframe")
    driverinstance.switch_to.frame(iframe_switch)
    slider = driverinstance.find_element(By.CSS_SELECTOR, '.slider')
    move = webdriver.ActionChains(driverinstance)
    move.click_and_hold(slider).perform()
    move.move_by_offset(340,0)
    move.release().perform()
    print("done")
    time.sleep(100)
    

if __name__ == "__main__":
    main()
