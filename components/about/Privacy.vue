<template>
  <article class="box">
    <h3 class="title is-3">
      {{ $t('aboutPage.privacy.title') }}
    </h3>
    <i18n path="aboutPage.privacy.par1" tag="p">
      <template #oengus-link>
        <a href="https://oengus.io">https://oengus.io</a>
      </template>
    </i18n>
    <p>{{ $t('aboutPage.privacy.par2') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.log.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.log.par1') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.cookies.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.cookies.par1') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.thirdParty.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.thirdParty.par1') }}</p>
    <p>{{ $t('aboutPage.privacy.thirdParty.par2') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.children.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.children.par1') }}</p>
    <p>{{ $t('aboutPage.privacy.children.par2') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.online.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.online.par1') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.consent.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.consent.par1') }}</p>
  </article>
</template>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "aboutPage": {
      "privacy": {
        "title": "Privacy Policy",
        "par1": "At Oengus, accessible from {oengus-link}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Oengus and how we use it.",
        "par2": "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.",
        "log": {
          "title": "Log Files",
          "par1": "Oengus follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."
        },
        "cookies": {
          "title": "Cookies and Web Beacons",
          "par1": "Like any other website, Oengus uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information."
        },
        "thirdParty": {
          "title": "Third Party Privacy Policies",
          "par1": "Oengus's Privacy Policy does not apply to other advertisers or websites.",
          "par2": "You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites."
        },
        "children": {
          "title": "Children's Information",
          "par1": "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
          "par2": "Oengus does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records."
        },
        "online": {
          "title": "Online Privacy Policy Only",
          "par1": "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Oengus. This policy is not applicable to any information collected offline or via channels other than this website."
        },
        "consent": {
          "title": "Consent",
          "par1": "By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions."
        }
      }
    }
  }
}
</i18n>
