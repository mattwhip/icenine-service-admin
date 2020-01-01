package actions

import (
	"bytes"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/gobuffalo/buffalo/binding"
	"github.com/golang/protobuf/proto"
	"github.com/pkg/errors"
)

func init() {
	binding.Register("multipart/form-data", func(req *http.Request, model interface{}) error {
		req.ParseMultipartForm(32 << 20)
		file, _, err := req.FormFile("proto")
		if err != nil {
			return errors.Wrap(err, "error retrieving form file 'proto'")
		}
		defer file.Close()
		buf := bytes.NewBuffer(nil)
		if _, err := io.Copy(buf, file); err != nil {
			return errors.Wrap(err, "error copying request byte buffer")
		}
		reqBytes := buf.Bytes()
		return proto.Unmarshal(reqBytes, model.(proto.Message))
	})
	binding.Register("application/proto", func(req *http.Request, model interface{}) error {
		b, err := ioutil.ReadAll(req.Body)
		if err != nil {
			return err
		}
		return proto.Unmarshal(b, model.(proto.Message))
	})
}
