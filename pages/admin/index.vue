<template>
<v-container>
  <common-header/>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-card tile>
        <v-btn block x-large to="/admin/user_management" nuxt>
          <v-card-title>ユーザー管理</v-card-title>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-card tile>
        <v-btn block x-large to="/admin/questions_management" nuxt>
          <v-card-title>問題管理</v-card-title>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

