var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <div>
          <ProfilePic src="//media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/087/3b6/03d99cf.jpg" intials="MF" alt="Mark Funk" />
          &nbsp;
          <ProfilePic initials="MF" alt="Mark Funk" />
        </div>
        <hr />
        <div>
          <ProfilePic small src="//media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/087/3b6/03d99cf.jpg" intials="MF" alt="Mark Funk" />
          &nbsp;
          <ProfilePic small initials="MF" alt="Mark Funk" />
        </div>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);