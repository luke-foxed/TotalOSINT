import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Done, Help, Build } from '@material-ui/icons';
import { IconHeader } from '../layout/IconHeader';

const useStyles = makeStyles(() => ({
  actionButton: {
    margin: '15px',
    borderRadius: '15px',
    width: '200px',
    color: 'white',
    border: 'solid 2px white',
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div
      style={{
        width: '60%',
        margin: 'auto',
        paddingTop: '20px',

        color: 'white',
      }}
    >
      <IconHeader text='What It Does' icon={Done} color={'white'} />

      <Typography style={{ marginTop: '30px', marginBottom: '40px' }}>
        TotalOSINT provides a centralised location for quickly retrieving the
        reputation of any IP address, domain or file hash using open source
        intelligence. This app will quickly retrieve a complete OSINT profile
        for the searched item - returning information from:
        <ul>
          <li>VirusTotal</li>
          <li>IBM X-Force</li>
          <li>MetaDefender</li>
          <li>WhoIsXML</li>
          <li>IP Void</li>
          <li>Abuse IP</li>
        </ul>
        The returned results can then be saved and viewed at any time. This can
        be useful when storing multiple results for the same search artifact
        over a period of time so see how the reputation of this artifact may
        change over time.
        <br /> <br />
        <b>*Note*</b>
        <i>
          The saved data returned from this app is not used for any commercial
          purposes. This project as a whole was simply made for fun as well as
          personal use!
        </i>
      </Typography>

      <IconHeader text='How It Works' icon={Help} color={'white'} />

      <Typography style={{ marginTop: '30px', marginBottom: '40px' }}>
        TotalOSINT works through the use of web scraping as well as third-party
        APIs. Upon entering a search term, the websites listed above are all
        visited and scraped in parallel - meaning results from up to 5 different
        websites can be scraped in a matter of seconds. As expected, web
        scrapers including those used in this app are not 100% fail-proof.
        Sometimes scraping one or more of the above sites might fail. Simply
        running the search again will likely fix this.
      </Typography>

      <IconHeader text='How It Is Made' icon={Build} color={'white'} />
      <Typography style={{ marginTop: '30px', marginBottom: '40px' }}>
        This app is built primarily using:
        <li>React & Redux</li>
        <li>NodeJS</li>
        <li>ExpressJS</li>
        <li>Puppeteer</li>
        <li>MongoDB</li>
        <li>Material UI</li>
        <br />
        Please feel free to follow me on Github or get in contact if you
        encounter any issues (which is to be expected)!
      </Typography>
    </div>
  );
};

export default About;
