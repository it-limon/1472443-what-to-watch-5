import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUserInfo} from "../../store/selectors/user-selector";
import Props from "../../props";
import {AppPages, AppRoute} from "../../const";
import {Link} from "react-router-dom";

const UserBlock = (props) => {
  const {userInfo, currentPage} = props;

  const withActiveUserLink = currentPage !== AppPages.MYLIST;

  const user = (
    <div className="user-block__avatar">
      <img src={userInfo.avatarUrl} alt={userInfo.name} width="63" height="63" />
    </div>
  );

  const userBlock = () => {
    if (withActiveUserLink) {
      return (
        <Link to={AppRoute.MYLIST}>
          {user}
        </Link>
      );
    } else {
      return user;
    }
  };

  return userBlock();
};

UserBlock.propTypes = {
  userInfo: Props.userInfo,
  currentPage: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  userInfo: getUserInfo(state)
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);