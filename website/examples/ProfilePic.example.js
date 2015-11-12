var ComponentExample = React.createClass({
  getInitialState() {
    return {
      imgSrc: '//ilikebutts.com/mark/funk/likes/butts.jpg'
    };
  },

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        imgSrc: '//scontent.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11173398_10101985017610718_4173222164779011522_n.jpg?oh=14837ad39c948e21af6b8b331b78875b&oe=55F189A1'
      });
    }, 4000);
  },

  render() {
    return (
      <div>
        <div>
          <ProfilePic src="//media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/087/3b6/03d99cf.jpg" initials="MF" />
          &nbsp;
          <ProfilePic className="some-additional-class" src={this.state.imgSrc} initials="SM" />
          &nbsp;
          <ProfilePic initials="BT" />
        </div>
        <hr />
        <div>
          <ProfilePic small src="//media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/087/3b6/03d99cf.jpg" initials="MF" />
          &nbsp;
          <ProfilePic small initials="MF" />
        </div>
        <hr />
        <div>
          <ProfilePic buyer src="//img1.wikia.nocookie.net/__cb20120128192952/muppet/images/0/08/CookieMonsterWaving.jpg" initials="CM" />
          &nbsp;
          <ProfilePic seller src="https://pmcmovieline.files.wordpress.com/2011/12/bert2002.jpg" initials="SM" />
          &nbsp;
          <ProfilePic buyer seller src="//www.independent.co.uk/incoming/article10237128.ece/binary/original/bigbird.jpg" initials="BB" />
        </div>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);