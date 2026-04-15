package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PingHandler(c *gin.Context) {
	//return json response 
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}
