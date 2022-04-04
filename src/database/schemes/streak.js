/**
 *    Copyright 2022 MiraBellierr

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: console.log,
  storage: "database.sqlite",
});

const Streak = function () {
  const StreakScheme = sequelize.define("streak", {
    userid: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    streak: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    elapse: {
      type: Sequelize.BIGINT,
    },
  });

  StreakScheme.sync();

  return StreakScheme;
};

module.exports = { Streak };
