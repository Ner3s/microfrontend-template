/**
 * @Helper
 * name: Exact name in Module Federation Plugin.
 * url: You must create env to use here.
 * remote: Connection return for use.
 */

module.exports = {
  name: 'mfe',
  url: process.env.REMOTE_MFE_URL,

  get remote(){
    return `${this.name}@${this.url}/remoteEntry.js`;
  }
}