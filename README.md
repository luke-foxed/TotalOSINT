# TotalOSINT
TotalOSINT provides a centralised location for quickly retrieving the reputation of any IP address, domain or file hash using open source intelligence. 
This app will quickly retrieve a complete OSINT profile for the searched item - returning information from:

- VirusTotal
- IBM X-Force
- MetaDefender
- WhoIsXML (API)
- IP Void
- Abuse IP

This returned information can then be saved and viewed at any time.

Give it a try here: https://totalosint.herokuapp.com/

## Notes
- The scrapers used in this app are prone to failing, sometimes just retrying a search is enough to fix this. If any of these scrapers break due to changes in page structure/HTML, I will try to fix them as soon as possible.
- Saved results from the scraped websites in this app are not and should not be used for commercial purposes. The save functionality only exists as a means of gathering a history on search artifacts (e.g. the search results returned on the same IP a few months apart may be different if this IP was engaged in malicious activity.

## Screenshots:

![](https://i.imgur.com/KIrdVhw.png)

![](https://i.imgur.com/0tcgzHv.png)

![](https://i.imgur.com/0k8oOZR.png)

![](https://i.imgur.com/trDyXvn.jpg)


